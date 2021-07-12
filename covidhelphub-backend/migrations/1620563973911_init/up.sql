CREATE TABLE public."Availability" (
    id bigint NOT NULL,
    days text NOT NULL,
    minutes bigint NOT NULL,
    on_weekends boolean DEFAULT true NOT NULL,
    on_weekdays boolean DEFAULT true NOT NULL
);
COMMENT ON TABLE public."Availability" IS 'This table holds the availability of a volunteer';
CREATE SEQUENCE public."Availability_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Availability_id_seq" OWNED BY public."Availability".id;
CREATE TABLE public."Location" (
    id bigint NOT NULL,
    lat double precision NOT NULL,
    lng double precision NOT NULL,
    city character varying NOT NULL,
    country character varying NOT NULL,
    postcode character varying NOT NULL,
    address text NOT NULL
);
COMMENT ON TABLE public."Location" IS 'This table will hold all the locations and addresses';
CREATE SEQUENCE public."Location_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Location_id_seq" OWNED BY public."Location".id;
CREATE TABLE public."Request" (
    id bigint NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    phone character varying NOT NULL,
    assigned_volunteer_id bigint,
    location_id bigint NOT NULL,
    program_id bigint NOT NULL,
    step_id bigint NOT NULL,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    notes character varying NOT NULL
);
COMMENT ON TABLE public."Request" IS 'This table will hold all the requests that are made';
CREATE SEQUENCE public."Request_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Request_id_seq" OWNED BY public."Request".id;
CREATE TABLE public."Response" (
    id bigint NOT NULL,
    request_id bigint NOT NULL,
    step_id bigint NOT NULL,
    entity text NOT NULL,
    action text NOT NULL
);
COMMENT ON TABLE public."Response" IS 'This table holds all the responses for a request';
CREATE SEQUENCE public."Response_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Response_id_seq" OWNED BY public."Response".id;
CREATE TABLE public."Steps" (
    id bigint NOT NULL,
    name name NOT NULL,
    number integer NOT NULL,
    next_pstep_id bigint NOT NULL,
    program_id bigint NOT NULL,
    next_nstep_id bigint
);
COMMENT ON TABLE public."Steps" IS 'This table hosts the steps present in a program';
CREATE SEQUENCE public."Steps_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Steps_id_seq" OWNED BY public."Steps".id;
CREATE TABLE public."Volunteer" (
    id bigint NOT NULL,
    name name NOT NULL,
    email character varying NOT NULL,
    phone character varying NOT NULL,
    location_id bigint NOT NULL,
    availability_id bigint NOT NULL,
    program_id bigint NOT NULL,
    status text NOT NULL
);
COMMENT ON TABLE public."Volunteer" IS 'This table will hold all the volunteers';
CREATE SEQUENCE public."Volunteer_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Volunteer_id_seq" OWNED BY public."Volunteer".id;
CREATE TABLE public.action_enum_type (
    value text NOT NULL,
    description text NOT NULL
);
COMMENT ON TABLE public.action_enum_type IS 'This table will hold the legal values for the action enum';
CREATE TABLE public.entity_enum_types (
    value text NOT NULL,
    description text NOT NULL
);
COMMENT ON TABLE public.entity_enum_types IS 'This table contains all legal values of the enum entity';
CREATE TABLE public.programs (
    id bigint NOT NULL,
    name name NOT NULL
);
COMMENT ON TABLE public.programs IS 'This table will host the list of programs supported by R4H';
CREATE SEQUENCE public.programs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.programs_id_seq OWNED BY public.programs.id;
CREATE TABLE public.step_condition (
    entity text NOT NULL,
    action text NOT NULL,
    optional boolean DEFAULT false NOT NULL,
    proceed boolean DEFAULT true NOT NULL,
    step_id bigint NOT NULL,
    id bigint NOT NULL
);
COMMENT ON TABLE public.step_condition IS 'Represents the conditions associated with a step';
CREATE SEQUENCE public.step_condition_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.step_condition_id_seq OWNED BY public.step_condition.id;
CREATE TABLE public.users (
    id bigint NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    primary_email character varying NOT NULL,
    primary_phone character varying NOT NULL
);
COMMENT ON TABLE public.users IS 'This table will store all users that use our platform';
CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
CREATE TABLE public.volunteer_status_enum_type (
    value text NOT NULL,
    description text NOT NULL
);
COMMENT ON TABLE public.volunteer_status_enum_type IS 'This represents legal values for a volunteer''s status';
ALTER TABLE ONLY public."Availability" ALTER COLUMN id SET DEFAULT nextval('public."Availability_id_seq"'::regclass);
ALTER TABLE ONLY public."Location" ALTER COLUMN id SET DEFAULT nextval('public."Location_id_seq"'::regclass);
ALTER TABLE ONLY public."Request" ALTER COLUMN id SET DEFAULT nextval('public."Request_id_seq"'::regclass);
ALTER TABLE ONLY public."Response" ALTER COLUMN id SET DEFAULT nextval('public."Response_id_seq"'::regclass);
ALTER TABLE ONLY public."Steps" ALTER COLUMN id SET DEFAULT nextval('public."Steps_id_seq"'::regclass);
ALTER TABLE ONLY public."Volunteer" ALTER COLUMN id SET DEFAULT nextval('public."Volunteer_id_seq"'::regclass);
ALTER TABLE ONLY public.programs ALTER COLUMN id SET DEFAULT nextval('public.programs_id_seq'::regclass);
ALTER TABLE ONLY public.step_condition ALTER COLUMN id SET DEFAULT nextval('public.step_condition_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public."Availability"
    ADD CONSTRAINT "Availability_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Request_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Response"
    ADD CONSTRAINT "Response_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Steps"
    ADD CONSTRAINT "Steps_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Volunteer"
    ADD CONSTRAINT "Volunteer_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.action_enum_type
    ADD CONSTRAINT action_enum_type_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.entity_enum_types
    ADD CONSTRAINT entity_enum_types_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.step_condition
    ADD CONSTRAINT step_condition_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_primary_email_key UNIQUE (primary_email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_primary_phone_key UNIQUE (primary_phone);
ALTER TABLE ONLY public.volunteer_status_enum_type
    ADD CONSTRAINT volunteer_status_enum_type_pkey PRIMARY KEY (value);
ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Request_assigned_volunteer_id_fkey" FOREIGN KEY (assigned_volunteer_id) REFERENCES public."Volunteer"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Request_location_id_fkey" FOREIGN KEY (location_id) REFERENCES public."Location"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Request_program_id_fkey" FOREIGN KEY (program_id) REFERENCES public.programs(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Request"
    ADD CONSTRAINT "Request_step_id_fkey" FOREIGN KEY (step_id) REFERENCES public."Steps"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Response"
    ADD CONSTRAINT "Response_action_fkey" FOREIGN KEY (action) REFERENCES public.action_enum_type(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Response"
    ADD CONSTRAINT "Response_entity_fkey" FOREIGN KEY (entity) REFERENCES public.entity_enum_types(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Response"
    ADD CONSTRAINT "Response_request_id_fkey" FOREIGN KEY (request_id) REFERENCES public."Request"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Response"
    ADD CONSTRAINT "Response_step_id_fkey" FOREIGN KEY (step_id) REFERENCES public."Steps"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Steps"
    ADD CONSTRAINT "Steps_next_nstep_id_fkey" FOREIGN KEY (next_nstep_id) REFERENCES public."Steps"(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE ONLY public."Steps"
    ADD CONSTRAINT "Steps_next_pstep_id_fkey" FOREIGN KEY (next_pstep_id) REFERENCES public."Steps"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY public."Steps"
    ADD CONSTRAINT "Steps_program_id_fkey" FOREIGN KEY (program_id) REFERENCES public.programs(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Volunteer"
    ADD CONSTRAINT "Volunteer_availability_id_fkey" FOREIGN KEY (availability_id) REFERENCES public."Availability"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Volunteer"
    ADD CONSTRAINT "Volunteer_location_id_fkey" FOREIGN KEY (location_id) REFERENCES public."Location"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Volunteer"
    ADD CONSTRAINT "Volunteer_program_id_fkey" FOREIGN KEY (program_id) REFERENCES public.programs(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."Volunteer"
    ADD CONSTRAINT "Volunteer_status_fkey" FOREIGN KEY (status) REFERENCES public.volunteer_status_enum_type(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.step_condition
    ADD CONSTRAINT step_condition_action_fkey FOREIGN KEY (action) REFERENCES public.action_enum_type(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.step_condition
    ADD CONSTRAINT step_condition_entity_fkey FOREIGN KEY (entity) REFERENCES public.entity_enum_types(value) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.step_condition
    ADD CONSTRAINT step_condition_step_id_fkey FOREIGN KEY (step_id) REFERENCES public."Steps"(id) ON UPDATE CASCADE ON DELETE CASCADE;
