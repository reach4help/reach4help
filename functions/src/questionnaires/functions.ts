import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { EventContext } from 'firebase-functions/lib/cloud-functions';
import * as admin from 'firebase-admin';
import { IQuestionnaire, Questionnaire, QuestionnaireType } from '../models/questionnaires';
import { validateOrReject } from 'class-validator';
import { setIsUserCav, setIsUserPin } from '../users/functions';

const db = admin.firestore();

export const validateQuestionnaire = (value: IQuestionnaire): Promise<void> => {
  return validateOrReject(Questionnaire.factory(value)).then(() => {
    return Promise.resolve();
  });
};

export const updateUserQuestionnaireRef = (snapshot: DocumentSnapshot, userId: string | undefined, claims: { pin?: boolean; cav?: boolean } | undefined): Promise<void> => {
    const questionnaire = Questionnaire.factory(snapshot.data() as IQuestionnaire);

    // Only my questionnaires count and only if I am logged in for my own requests.
    if (!userId || questionnaire.parentRef.id !== userId) {
      return Promise.resolve();
    }

    const userRef = db.collection('users').doc(userId);
    const operations: Promise<void>[] = [];

    switch (questionnaire.type) {
      case QuestionnaireType.pin:
        operations.push(userRef
          .update({ pinQuestionnaireRef: snapshot.ref })
          .then());
        if (!claims?.pin) {
          // If I wasn't a PIN before... I am now
          operations.push(setIsUserPin(userId, true));
        }
        break;
      case QuestionnaireType.cav:
        operations.push(userRef
          .update({ cavQuestionnaireRef: snapshot.ref })
          .then());
        if (!claims?.cav) {
          // If I wasn't a CAV before... I am now
          operations.push(setIsUserCav(userId, true));
        }
        break;
      default:
        break;
    }

    return Promise.all(operations).then();
  }
;

export const onCreate = (snapshot: DocumentSnapshot, context: EventContext) => {
  return validateQuestionnaire(snapshot.data() as IQuestionnaire)
    .then(() => {
      return Promise.all([
        updateUserQuestionnaireRef(snapshot, context.auth?.uid, context.auth?.token),
      ]);
    })
    .catch(errors => {
      console.error('Invalid Questionnaire Found: ', errors);
      return db
        .collection('questionnaires')
        .doc(context.params.questionnaireId)
        .delete()
        .catch(() => {
          return Promise.resolve();
        });
    });
};
