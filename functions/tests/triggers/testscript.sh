for file in $(dirname $0)/*.test.ts;
do
    firebase emulators:exec --only firestore "yarn jest $file"
done