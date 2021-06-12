INSERT INTO "action_enum_type" (description,value) VALUES
    ('Represents a request that has been created but no other action has been performed on','created'),
    ('Represents a request for which the volunteers have been notified','send'),
    ('Represents a positive response from an entity','respondp'),
    ('Represents a negative response from an entity','respondn'),
    ('Represents a response from which the intent cannot be identified','respond');

INSERT INTO "entity_enum_types" (description,value) VALUES
    ('This entity represents a volunteer and can be used to represent actions or responses from a volunteer','volunteer'),
    ('This entity represents a beneficiary and can be used to represent any action or response from a beneficiary','beneficiary'),
    ('This entity represents a request. Any Action performed is performed on or by this entity','request');

INSERT INTO "volunteer_status_enum_type" (description,value) VALUES
    ('Indicates that the volunteer is still pending background verification','pending'),
    ('Indicates that the volunteer has been rejected during background verification','rejected'),
    ('Indicates that the volunteer has been accepted during background verification','completed');