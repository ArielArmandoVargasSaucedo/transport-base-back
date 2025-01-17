PGDMP  	                    |           DB_transport_base    16.0    16.0 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    237878    DB_transport_base    DATABASE     �   CREATE DATABASE "DB_transport_base" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
 #   DROP DATABASE "DB_transport_base";
                postgres    false            �            1259    237970    car    TABLE     �   CREATE TABLE public.car (
    id_car integer NOT NULL,
    car_number character varying NOT NULL,
    car_brand character varying NOT NULL,
    number_of_seats integer NOT NULL,
    "historyCarSituations" json NOT NULL
);
    DROP TABLE public.car;
       public         heap    postgres    false            �            1259    237969    car_id_car_seq    SEQUENCE     �   CREATE SEQUENCE public.car_id_car_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.car_id_car_seq;
       public          postgres    false    236            �           0    0    car_id_car_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.car_id_car_seq OWNED BY public.car.id_car;
          public          postgres    false    235            �            1259    237891    car_situation    TABLE     �   CREATE TABLE public.car_situation (
    id_cs integer NOT NULL,
    return_date_cs date,
    current_date_cs date NOT NULL,
    id_aut_type_cs integer NOT NULL,
    id_car integer NOT NULL
);
 !   DROP TABLE public.car_situation;
       public         heap    postgres    false            �            1259    237890    car_situation_id_cs_seq    SEQUENCE     �   CREATE SEQUENCE public.car_situation_id_cs_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.car_situation_id_cs_seq;
       public          postgres    false    218            �           0    0    car_situation_id_cs_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.car_situation_id_cs_seq OWNED BY public.car_situation.id_cs;
          public          postgres    false    217            �            1259    237914    change_type    TABLE     ~   CREATE TABLE public.change_type (
    id_aut_change_type integer NOT NULL,
    change_type_name character varying NOT NULL
);
    DROP TABLE public.change_type;
       public         heap    postgres    false            �            1259    237913 "   change_type_id_aut_change_type_seq    SEQUENCE     �   CREATE SEQUENCE public.change_type_id_aut_change_type_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.change_type_id_aut_change_type_seq;
       public          postgres    false    224            �           0    0 "   change_type_id_aut_change_type_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.change_type_id_aut_change_type_seq OWNED BY public.change_type.id_aut_change_type;
          public          postgres    false    223            �            1259    238337    codigo_verficacion    TABLE     �   CREATE TABLE public.codigo_verficacion (
    id integer NOT NULL,
    user_id integer NOT NULL,
    generation_date timestamp without time zone NOT NULL,
    code character varying NOT NULL
);
 &   DROP TABLE public.codigo_verficacion;
       public         heap    postgres    false            �            1259    238336    codigo_verficacion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.codigo_verficacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.codigo_verficacion_id_seq;
       public          postgres    false    248            �           0    0    codigo_verficacion_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.codigo_verficacion_id_seq OWNED BY public.codigo_verficacion.id;
          public          postgres    false    247            �            1259    237898    date_d    TABLE     �   CREATE TABLE public.date_d (
    id_aut_date integer NOT NULL,
    id_date date NOT NULL,
    hour_d time without time zone NOT NULL
);
    DROP TABLE public.date_d;
       public         heap    postgres    false            �            1259    237897    date_d_id_aut_date_seq    SEQUENCE     �   CREATE SEQUENCE public.date_d_id_aut_date_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.date_d_id_aut_date_seq;
       public          postgres    false    220            �           0    0    date_d_id_aut_date_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.date_d_id_aut_date_seq OWNED BY public.date_d.id_aut_date;
          public          postgres    false    219            �            1259    238025    driver    TABLE     %  CREATE TABLE public.driver (
    id_driver integer NOT NULL,
    dni_driver character varying NOT NULL,
    driver_name character varying NOT NULL,
    home_address character varying NOT NULL,
    is_copilot boolean NOT NULL,
    id_car integer,
    "historyDriverSituations" json NOT NULL
);
    DROP TABLE public.driver;
       public         heap    postgres    false            �            1259    238024    driver_id_driver_seq    SEQUENCE     �   CREATE SEQUENCE public.driver_id_driver_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.driver_id_driver_seq;
       public          postgres    false    246            �           0    0    driver_id_driver_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.driver_id_driver_seq OWNED BY public.driver.id_driver;
          public          postgres    false    245            �            1259    237992    driver_situation    TABLE     �   CREATE TABLE public.driver_situation (
    id_ds integer NOT NULL,
    return_date_ds date,
    current_date_ds date NOT NULL,
    id_aut_type_ds integer NOT NULL,
    id_driver integer NOT NULL
);
 $   DROP TABLE public.driver_situation;
       public         heap    postgres    false            �            1259    237991    driver_situation_id_ds_seq    SEQUENCE     �   CREATE SEQUENCE public.driver_situation_id_ds_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.driver_situation_id_ds_seq;
       public          postgres    false    240            �           0    0    driver_situation_id_ds_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.driver_situation_id_ds_seq OWNED BY public.driver_situation.id_ds;
          public          postgres    false    239            �            1259    237905 
   group_tour    TABLE     �   CREATE TABLE public.group_tour (
    id_group integer NOT NULL,
    group_code integer NOT NULL,
    group_country character varying NOT NULL,
    number_of_tourist integer NOT NULL
);
    DROP TABLE public.group_tour;
       public         heap    postgres    false            �            1259    237904    group_tour_id_group_seq    SEQUENCE     �   CREATE SEQUENCE public.group_tour_id_group_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.group_tour_id_group_seq;
       public          postgres    false    222            �           0    0    group_tour_id_group_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.group_tour_id_group_seq OWNED BY public.group_tour.id_group;
          public          postgres    false    221            �            1259    237925 
   mod_change    TABLE     �   CREATE TABLE public.mod_change (
    id_mod_change integer NOT NULL,
    id_aut_change_type integer NOT NULL,
    id_modification integer NOT NULL
);
    DROP TABLE public.mod_change;
       public         heap    postgres    false            �            1259    237924    mod_change_id_mod_change_seq    SEQUENCE     �   CREATE SEQUENCE public.mod_change_id_mod_change_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.mod_change_id_mod_change_seq;
       public          postgres    false    226            �           0    0    mod_change_id_mod_change_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.mod_change_id_mod_change_seq OWNED BY public.mod_change.id_mod_change;
          public          postgres    false    225            �            1259    237932    modification    TABLE     �   CREATE TABLE public.modification (
    id_modification integer NOT NULL,
    modification_date date NOT NULL,
    id_solicitude integer NOT NULL
);
     DROP TABLE public.modification;
       public         heap    postgres    false            �            1259    237931     modification_id_modification_seq    SEQUENCE     �   CREATE SEQUENCE public.modification_id_modification_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.modification_id_modification_seq;
       public          postgres    false    228            �           0    0     modification_id_modification_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.modification_id_modification_seq OWNED BY public.modification.id_modification;
          public          postgres    false    227            �            1259    237939    programming_type    TABLE        CREATE TABLE public.programming_type (
    id_aut_prog_type integer NOT NULL,
    prog_type_name character varying NOT NULL
);
 $   DROP TABLE public.programming_type;
       public         heap    postgres    false            �            1259    237938 %   programming_type_id_aut_prog_type_seq    SEQUENCE     �   CREATE SEQUENCE public.programming_type_id_aut_prog_type_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.programming_type_id_aut_prog_type_seq;
       public          postgres    false    230            �           0    0 %   programming_type_id_aut_prog_type_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.programming_type_id_aut_prog_type_seq OWNED BY public.programming_type.id_aut_prog_type;
          public          postgres    false    229            �            1259    237999    role    TABLE     i   CREATE TABLE public.role (
    id_aut_role integer NOT NULL,
    role_type character varying NOT NULL
);
    DROP TABLE public.role;
       public         heap    postgres    false            �            1259    237998    role_id_aut_role_seq    SEQUENCE     �   CREATE SEQUENCE public.role_id_aut_role_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.role_id_aut_role_seq;
       public          postgres    false    242            �           0    0    role_id_aut_role_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.role_id_aut_role_seq OWNED BY public.role.id_aut_role;
          public          postgres    false    241            �            1259    237950    route    TABLE     �   CREATE TABLE public.route (
    id_route integer NOT NULL,
    km_available_star double precision NOT NULL,
    km_available_end double precision NOT NULL,
    pick_up_location character varying NOT NULL,
    end_time time without time zone NOT NULL
);
    DROP TABLE public.route;
       public         heap    postgres    false            �            1259    237949    route_id_route_seq    SEQUENCE     �   CREATE SEQUENCE public.route_id_route_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.route_id_route_seq;
       public          postgres    false    232            �           0    0    route_id_route_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.route_id_route_seq OWNED BY public.route.id_route;
          public          postgres    false    231            �            1259    237961 
   solicitude    TABLE     �  CREATE TABLE public.solicitude (
    id_solicitude integer NOT NULL,
    programming_start_time time without time zone NOT NULL,
    programming_to_be_done character varying NOT NULL,
    duration_time time without time zone NOT NULL,
    mileage double precision NOT NULL,
    id_car integer NOT NULL,
    id_aut_prog_type integer NOT NULL,
    id_group integer NOT NULL,
    "dateD" date NOT NULL,
    id_route integer NOT NULL
);
    DROP TABLE public.solicitude;
       public         heap    postgres    false            �            1259    237960    solicitude_id_solicitude_seq    SEQUENCE     �   CREATE SEQUENCE public.solicitude_id_solicitude_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.solicitude_id_solicitude_seq;
       public          postgres    false    234            �           0    0    solicitude_id_solicitude_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.solicitude_id_solicitude_seq OWNED BY public.solicitude.id_solicitude;
          public          postgres    false    233            �            1259    237880    type_car_situation    TABLE     �   CREATE TABLE public.type_car_situation (
    id_aut_type_cs integer NOT NULL,
    type_cs_name character varying NOT NULL,
    is_return boolean NOT NULL
);
 &   DROP TABLE public.type_car_situation;
       public         heap    postgres    false            �            1259    237879 %   type_car_situation_id_aut_type_cs_seq    SEQUENCE     �   CREATE SEQUENCE public.type_car_situation_id_aut_type_cs_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.type_car_situation_id_aut_type_cs_seq;
       public          postgres    false    216            �           0    0 %   type_car_situation_id_aut_type_cs_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.type_car_situation_id_aut_type_cs_seq OWNED BY public.type_car_situation.id_aut_type_cs;
          public          postgres    false    215            �            1259    237981    type_driver_situation    TABLE     �   CREATE TABLE public.type_driver_situation (
    id_aut_type_ds integer NOT NULL,
    type_ds_name character varying NOT NULL,
    is_return boolean NOT NULL
);
 )   DROP TABLE public.type_driver_situation;
       public         heap    postgres    false            �            1259    237980 (   type_driver_situation_id_aut_type_ds_seq    SEQUENCE     �   CREATE SEQUENCE public.type_driver_situation_id_aut_type_ds_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.type_driver_situation_id_aut_type_ds_seq;
       public          postgres    false    238            �           0    0 (   type_driver_situation_id_aut_type_ds_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.type_driver_situation_id_aut_type_ds_seq OWNED BY public.type_driver_situation.id_aut_type_ds;
          public          postgres    false    237            �            1259    238010    user    TABLE     !  CREATE TABLE public."user" (
    id_aut_user integer NOT NULL,
    user_name character varying NOT NULL,
    password_user character varying NOT NULL,
    dni_user character varying NOT NULL,
    id_aut_role integer NOT NULL,
    id_driver integer,
    email character varying NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    238009    user_id_aut_user_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_aut_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.user_id_aut_user_seq;
       public          postgres    false    244            �           0    0    user_id_aut_user_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.user_id_aut_user_seq OWNED BY public."user".id_aut_user;
          public          postgres    false    243            �           2604    238211 
   car id_car    DEFAULT     h   ALTER TABLE ONLY public.car ALTER COLUMN id_car SET DEFAULT nextval('public.car_id_car_seq'::regclass);
 9   ALTER TABLE public.car ALTER COLUMN id_car DROP DEFAULT;
       public          postgres    false    235    236    236            �           2604    238212    car_situation id_cs    DEFAULT     z   ALTER TABLE ONLY public.car_situation ALTER COLUMN id_cs SET DEFAULT nextval('public.car_situation_id_cs_seq'::regclass);
 B   ALTER TABLE public.car_situation ALTER COLUMN id_cs DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    238113    change_type id_aut_change_type    DEFAULT     �   ALTER TABLE ONLY public.change_type ALTER COLUMN id_aut_change_type SET DEFAULT nextval('public.change_type_id_aut_change_type_seq'::regclass);
 M   ALTER TABLE public.change_type ALTER COLUMN id_aut_change_type DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    238340    codigo_verficacion id    DEFAULT     ~   ALTER TABLE ONLY public.codigo_verficacion ALTER COLUMN id SET DEFAULT nextval('public.codigo_verficacion_id_seq'::regclass);
 D   ALTER TABLE public.codigo_verficacion ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    248    247    248            �           2604    238114    date_d id_aut_date    DEFAULT     x   ALTER TABLE ONLY public.date_d ALTER COLUMN id_aut_date SET DEFAULT nextval('public.date_d_id_aut_date_seq'::regclass);
 A   ALTER TABLE public.date_d ALTER COLUMN id_aut_date DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    238213    driver id_driver    DEFAULT     t   ALTER TABLE ONLY public.driver ALTER COLUMN id_driver SET DEFAULT nextval('public.driver_id_driver_seq'::regclass);
 ?   ALTER TABLE public.driver ALTER COLUMN id_driver DROP DEFAULT;
       public          postgres    false    246    245    246            �           2604    238214    driver_situation id_ds    DEFAULT     �   ALTER TABLE ONLY public.driver_situation ALTER COLUMN id_ds SET DEFAULT nextval('public.driver_situation_id_ds_seq'::regclass);
 E   ALTER TABLE public.driver_situation ALTER COLUMN id_ds DROP DEFAULT;
       public          postgres    false    239    240    240            �           2604    238215    group_tour id_group    DEFAULT     z   ALTER TABLE ONLY public.group_tour ALTER COLUMN id_group SET DEFAULT nextval('public.group_tour_id_group_seq'::regclass);
 B   ALTER TABLE public.group_tour ALTER COLUMN id_group DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    238118    mod_change id_mod_change    DEFAULT     �   ALTER TABLE ONLY public.mod_change ALTER COLUMN id_mod_change SET DEFAULT nextval('public.mod_change_id_mod_change_seq'::regclass);
 G   ALTER TABLE public.mod_change ALTER COLUMN id_mod_change DROP DEFAULT;
       public          postgres    false    226    225    226            �           2604    238119    modification id_modification    DEFAULT     �   ALTER TABLE ONLY public.modification ALTER COLUMN id_modification SET DEFAULT nextval('public.modification_id_modification_seq'::regclass);
 K   ALTER TABLE public.modification ALTER COLUMN id_modification DROP DEFAULT;
       public          postgres    false    227    228    228            �           2604    238216 !   programming_type id_aut_prog_type    DEFAULT     �   ALTER TABLE ONLY public.programming_type ALTER COLUMN id_aut_prog_type SET DEFAULT nextval('public.programming_type_id_aut_prog_type_seq'::regclass);
 P   ALTER TABLE public.programming_type ALTER COLUMN id_aut_prog_type DROP DEFAULT;
       public          postgres    false    230    229    230            �           2604    238217    role id_aut_role    DEFAULT     t   ALTER TABLE ONLY public.role ALTER COLUMN id_aut_role SET DEFAULT nextval('public.role_id_aut_role_seq'::regclass);
 ?   ALTER TABLE public.role ALTER COLUMN id_aut_role DROP DEFAULT;
       public          postgres    false    242    241    242            �           2604    238218    route id_route    DEFAULT     p   ALTER TABLE ONLY public.route ALTER COLUMN id_route SET DEFAULT nextval('public.route_id_route_seq'::regclass);
 =   ALTER TABLE public.route ALTER COLUMN id_route DROP DEFAULT;
       public          postgres    false    232    231    232            �           2604    238219    solicitude id_solicitude    DEFAULT     �   ALTER TABLE ONLY public.solicitude ALTER COLUMN id_solicitude SET DEFAULT nextval('public.solicitude_id_solicitude_seq'::regclass);
 G   ALTER TABLE public.solicitude ALTER COLUMN id_solicitude DROP DEFAULT;
       public          postgres    false    234    233    234            �           2604    238220 !   type_car_situation id_aut_type_cs    DEFAULT     �   ALTER TABLE ONLY public.type_car_situation ALTER COLUMN id_aut_type_cs SET DEFAULT nextval('public.type_car_situation_id_aut_type_cs_seq'::regclass);
 P   ALTER TABLE public.type_car_situation ALTER COLUMN id_aut_type_cs DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    238221 $   type_driver_situation id_aut_type_ds    DEFAULT     �   ALTER TABLE ONLY public.type_driver_situation ALTER COLUMN id_aut_type_ds SET DEFAULT nextval('public.type_driver_situation_id_aut_type_ds_seq'::regclass);
 S   ALTER TABLE public.type_driver_situation ALTER COLUMN id_aut_type_ds DROP DEFAULT;
       public          postgres    false    237    238    238            �           2604    238222    user id_aut_user    DEFAULT     v   ALTER TABLE ONLY public."user" ALTER COLUMN id_aut_user SET DEFAULT nextval('public.user_id_aut_user_seq'::regclass);
 A   ALTER TABLE public."user" ALTER COLUMN id_aut_user DROP DEFAULT;
       public          postgres    false    244    243    244            �          0    237970    car 
   TABLE DATA           e   COPY public.car (id_car, car_number, car_brand, number_of_seats, "historyCarSituations") FROM stdin;
    public          postgres    false    236   ÿ       �          0    237891    car_situation 
   TABLE DATA           g   COPY public.car_situation (id_cs, return_date_cs, current_date_cs, id_aut_type_cs, id_car) FROM stdin;
    public          postgres    false    218   ��       �          0    237914    change_type 
   TABLE DATA           K   COPY public.change_type (id_aut_change_type, change_type_name) FROM stdin;
    public          postgres    false    224   ��       �          0    238337    codigo_verficacion 
   TABLE DATA           P   COPY public.codigo_verficacion (id, user_id, generation_date, code) FROM stdin;
    public          postgres    false    248   U�       �          0    237898    date_d 
   TABLE DATA           >   COPY public.date_d (id_aut_date, id_date, hour_d) FROM stdin;
    public          postgres    false    220   ��       �          0    238025    driver 
   TABLE DATA           �   COPY public.driver (id_driver, dni_driver, driver_name, home_address, is_copilot, id_car, "historyDriverSituations") FROM stdin;
    public          postgres    false    246   �       �          0    237992    driver_situation 
   TABLE DATA           m   COPY public.driver_situation (id_ds, return_date_ds, current_date_ds, id_aut_type_ds, id_driver) FROM stdin;
    public          postgres    false    240   ��       �          0    237905 
   group_tour 
   TABLE DATA           \   COPY public.group_tour (id_group, group_code, group_country, number_of_tourist) FROM stdin;
    public          postgres    false    222   &�       �          0    237925 
   mod_change 
   TABLE DATA           X   COPY public.mod_change (id_mod_change, id_aut_change_type, id_modification) FROM stdin;
    public          postgres    false    226   R�       �          0    237932    modification 
   TABLE DATA           Y   COPY public.modification (id_modification, modification_date, id_solicitude) FROM stdin;
    public          postgres    false    228   o�       �          0    237939    programming_type 
   TABLE DATA           L   COPY public.programming_type (id_aut_prog_type, prog_type_name) FROM stdin;
    public          postgres    false    230   ��       �          0    237999    role 
   TABLE DATA           6   COPY public.role (id_aut_role, role_type) FROM stdin;
    public          postgres    false    242   ��       �          0    237950    route 
   TABLE DATA           j   COPY public.route (id_route, km_available_star, km_available_end, pick_up_location, end_time) FROM stdin;
    public          postgres    false    232   �       �          0    237961 
   solicitude 
   TABLE DATA           �   COPY public.solicitude (id_solicitude, programming_start_time, programming_to_be_done, duration_time, mileage, id_car, id_aut_prog_type, id_group, "dateD", id_route) FROM stdin;
    public          postgres    false    234   4�       �          0    237880    type_car_situation 
   TABLE DATA           U   COPY public.type_car_situation (id_aut_type_cs, type_cs_name, is_return) FROM stdin;
    public          postgres    false    216   Q�       �          0    237981    type_driver_situation 
   TABLE DATA           X   COPY public.type_driver_situation (id_aut_type_ds, type_ds_name, is_return) FROM stdin;
    public          postgres    false    238   ��       �          0    238010    user 
   TABLE DATA           p   COPY public."user" (id_aut_user, user_name, password_user, dni_user, id_aut_role, id_driver, email) FROM stdin;
    public          postgres    false    244   ��       �           0    0    car_id_car_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.car_id_car_seq', 31, true);
          public          postgres    false    235            �           0    0    car_situation_id_cs_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.car_situation_id_cs_seq', 40, true);
          public          postgres    false    217            �           0    0 "   change_type_id_aut_change_type_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.change_type_id_aut_change_type_seq', 5, true);
          public          postgres    false    223            �           0    0    codigo_verficacion_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.codigo_verficacion_id_seq', 7, true);
          public          postgres    false    247            �           0    0    date_d_id_aut_date_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.date_d_id_aut_date_seq', 1, false);
          public          postgres    false    219            �           0    0    driver_id_driver_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.driver_id_driver_seq', 18, true);
          public          postgres    false    245            �           0    0    driver_situation_id_ds_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.driver_situation_id_ds_seq', 19, true);
          public          postgres    false    239            �           0    0    group_tour_id_group_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.group_tour_id_group_seq', 1, true);
          public          postgres    false    221            �           0    0    mod_change_id_mod_change_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.mod_change_id_mod_change_seq', 1, false);
          public          postgres    false    225            �           0    0     modification_id_modification_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.modification_id_modification_seq', 1, false);
          public          postgres    false    227            �           0    0 %   programming_type_id_aut_prog_type_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.programming_type_id_aut_prog_type_seq', 4, true);
          public          postgres    false    229            �           0    0    role_id_aut_role_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.role_id_aut_role_seq', 3, true);
          public          postgres    false    241            �           0    0    route_id_route_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.route_id_route_seq', 1, false);
          public          postgres    false    231            �           0    0    solicitude_id_solicitude_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.solicitude_id_solicitude_seq', 2, true);
          public          postgres    false    233            �           0    0 %   type_car_situation_id_aut_type_cs_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.type_car_situation_id_aut_type_cs_seq', 7, true);
          public          postgres    false    215            �           0    0 (   type_driver_situation_id_aut_type_ds_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.type_driver_situation_id_aut_type_ds_seq', 12, true);
          public          postgres    false    237            �           0    0    user_id_aut_user_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.user_id_aut_user_seq', 12, true);
          public          postgres    false    243            �           2606    237930 )   mod_change PK_0994da54d1cb5684df54e1e635b 
   CONSTRAINT     t   ALTER TABLE ONLY public.mod_change
    ADD CONSTRAINT "PK_0994da54d1cb5684df54e1e635b" PRIMARY KEY (id_mod_change);
 U   ALTER TABLE ONLY public.mod_change DROP CONSTRAINT "PK_0994da54d1cb5684df54e1e635b";
       public            postgres    false    226            �           2606    237988 4   type_driver_situation PK_0bf9b3f3edf08a8cdcf12a13191 
   CONSTRAINT     �   ALTER TABLE ONLY public.type_driver_situation
    ADD CONSTRAINT "PK_0bf9b3f3edf08a8cdcf12a13191" PRIMARY KEY (id_aut_type_ds);
 `   ALTER TABLE ONLY public.type_driver_situation DROP CONSTRAINT "PK_0bf9b3f3edf08a8cdcf12a13191";
       public            postgres    false    238            �           2606    237887 1   type_car_situation PK_393759b3192752b800f3a914e07 
   CONSTRAINT     }   ALTER TABLE ONLY public.type_car_situation
    ADD CONSTRAINT "PK_393759b3192752b800f3a914e07" PRIMARY KEY (id_aut_type_cs);
 ]   ALTER TABLE ONLY public.type_car_situation DROP CONSTRAINT "PK_393759b3192752b800f3a914e07";
       public            postgres    false    216            �           2606    237968 )   solicitude PK_478518c7ea6ac83aaf3f98865e3 
   CONSTRAINT     t   ALTER TABLE ONLY public.solicitude
    ADD CONSTRAINT "PK_478518c7ea6ac83aaf3f98865e3" PRIMARY KEY (id_solicitude);
 U   ALTER TABLE ONLY public.solicitude DROP CONSTRAINT "PK_478518c7ea6ac83aaf3f98865e3";
       public            postgres    false    234            �           2606    238017 #   user PK_6915eb87d97eab66e3f43ac26cf 
   CONSTRAINT     n   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_6915eb87d97eab66e3f43ac26cf" PRIMARY KEY (id_aut_user);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_6915eb87d97eab66e3f43ac26cf";
       public            postgres    false    244            �           2606    237912 )   group_tour PK_72a6f2a36040e995a7fe92c203c 
   CONSTRAINT     o   ALTER TABLE ONLY public.group_tour
    ADD CONSTRAINT "PK_72a6f2a36040e995a7fe92c203c" PRIMARY KEY (id_group);
 U   ALTER TABLE ONLY public.group_tour DROP CONSTRAINT "PK_72a6f2a36040e995a7fe92c203c";
       public            postgres    false    222            �           2606    237903 %   date_d PK_83d9dea07e3bb4e9a3046c60276 
   CONSTRAINT     n   ALTER TABLE ONLY public.date_d
    ADD CONSTRAINT "PK_83d9dea07e3bb4e9a3046c60276" PRIMARY KEY (id_aut_date);
 Q   ALTER TABLE ONLY public.date_d DROP CONSTRAINT "PK_83d9dea07e3bb4e9a3046c60276";
       public            postgres    false    220            �           2606    237896 ,   car_situation PK_9641c62e062473116bee933190d 
   CONSTRAINT     o   ALTER TABLE ONLY public.car_situation
    ADD CONSTRAINT "PK_9641c62e062473116bee933190d" PRIMARY KEY (id_cs);
 X   ALTER TABLE ONLY public.car_situation DROP CONSTRAINT "PK_9641c62e062473116bee933190d";
       public            postgres    false    218            �           2606    238344 1   codigo_verficacion PK_be967ef3c72afea45d73d80390f 
   CONSTRAINT     q   ALTER TABLE ONLY public.codigo_verficacion
    ADD CONSTRAINT "PK_be967ef3c72afea45d73d80390f" PRIMARY KEY (id);
 ]   ALTER TABLE ONLY public.codigo_verficacion DROP CONSTRAINT "PK_be967ef3c72afea45d73d80390f";
       public            postgres    false    248            �           2606    237937 +   modification PK_d174fdacca71339b5d9729a7bea 
   CONSTRAINT     x   ALTER TABLE ONLY public.modification
    ADD CONSTRAINT "PK_d174fdacca71339b5d9729a7bea" PRIMARY KEY (id_modification);
 W   ALTER TABLE ONLY public.modification DROP CONSTRAINT "PK_d174fdacca71339b5d9729a7bea";
       public            postgres    false    228            �           2606    238006 #   role PK_dd8d00a1b205385f47b2c5c68f9 
   CONSTRAINT     l   ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_dd8d00a1b205385f47b2c5c68f9" PRIMARY KEY (id_aut_role);
 O   ALTER TABLE ONLY public.role DROP CONSTRAINT "PK_dd8d00a1b205385f47b2c5c68f9";
       public            postgres    false    242            �           2606    238032 %   driver PK_e0244a284b77a809c3d0b0a2412 
   CONSTRAINT     l   ALTER TABLE ONLY public.driver
    ADD CONSTRAINT "PK_e0244a284b77a809c3d0b0a2412" PRIMARY KEY (id_driver);
 Q   ALTER TABLE ONLY public.driver DROP CONSTRAINT "PK_e0244a284b77a809c3d0b0a2412";
       public            postgres    false    246            �           2606    237957 $   route PK_e72be282a3f2543915725c9ed52 
   CONSTRAINT     j   ALTER TABLE ONLY public.route
    ADD CONSTRAINT "PK_e72be282a3f2543915725c9ed52" PRIMARY KEY (id_route);
 P   ALTER TABLE ONLY public.route DROP CONSTRAINT "PK_e72be282a3f2543915725c9ed52";
       public            postgres    false    232            �           2606    237997 /   driver_situation PK_e931e69d6aebe2e408196418a4a 
   CONSTRAINT     r   ALTER TABLE ONLY public.driver_situation
    ADD CONSTRAINT "PK_e931e69d6aebe2e408196418a4a" PRIMARY KEY (id_ds);
 [   ALTER TABLE ONLY public.driver_situation DROP CONSTRAINT "PK_e931e69d6aebe2e408196418a4a";
       public            postgres    false    240            �           2606    237977 "   car PK_ede50d24e10da9e8e3e762555fd 
   CONSTRAINT     f   ALTER TABLE ONLY public.car
    ADD CONSTRAINT "PK_ede50d24e10da9e8e3e762555fd" PRIMARY KEY (id_car);
 N   ALTER TABLE ONLY public.car DROP CONSTRAINT "PK_ede50d24e10da9e8e3e762555fd";
       public            postgres    false    236            �           2606    237921 *   change_type PK_ee8515d2db7f07ce39e8d2d898e 
   CONSTRAINT     z   ALTER TABLE ONLY public.change_type
    ADD CONSTRAINT "PK_ee8515d2db7f07ce39e8d2d898e" PRIMARY KEY (id_aut_change_type);
 V   ALTER TABLE ONLY public.change_type DROP CONSTRAINT "PK_ee8515d2db7f07ce39e8d2d898e";
       public            postgres    false    224            �           2606    237946 /   programming_type PK_f9e70cb0314085ce281ec6af016 
   CONSTRAINT     }   ALTER TABLE ONLY public.programming_type
    ADD CONSTRAINT "PK_f9e70cb0314085ce281ec6af016" PRIMARY KEY (id_aut_prog_type);
 [   ALTER TABLE ONLY public.programming_type DROP CONSTRAINT "PK_f9e70cb0314085ce281ec6af016";
       public            postgres    false    230            �           2606    238023 #   user REL_c3a71cf1400768819eedbc1dd4 
   CONSTRAINT     g   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "REL_c3a71cf1400768819eedbc1dd4" UNIQUE (id_driver);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "REL_c3a71cf1400768819eedbc1dd4";
       public            postgres    false    244            �           2606    238330 /   driver_situation UQ_263a6cd02e51ddd131a84204a2c 
   CONSTRAINT     q   ALTER TABLE ONLY public.driver_situation
    ADD CONSTRAINT "UQ_263a6cd02e51ddd131a84204a2c" UNIQUE (id_driver);
 [   ALTER TABLE ONLY public.driver_situation DROP CONSTRAINT "UQ_263a6cd02e51ddd131a84204a2c";
       public            postgres    false    240            �           2606    237889 1   type_car_situation UQ_2c6c47e4b419d8750e22cce4363 
   CONSTRAINT     v   ALTER TABLE ONLY public.type_car_situation
    ADD CONSTRAINT "UQ_2c6c47e4b419d8750e22cce4363" UNIQUE (type_cs_name);
 ]   ALTER TABLE ONLY public.type_car_situation DROP CONSTRAINT "UQ_2c6c47e4b419d8750e22cce4363";
       public            postgres    false    216            �           2606    237923 *   change_type UQ_443d3fbc7dbaa3bc2d38c2ab9f8 
   CONSTRAINT     s   ALTER TABLE ONLY public.change_type
    ADD CONSTRAINT "UQ_443d3fbc7dbaa3bc2d38c2ab9f8" UNIQUE (change_type_name);
 V   ALTER TABLE ONLY public.change_type DROP CONSTRAINT "UQ_443d3fbc7dbaa3bc2d38c2ab9f8";
       public            postgres    false    224            �           2606    237948 /   programming_type UQ_57d269fba4fec6d54652e339191 
   CONSTRAINT     v   ALTER TABLE ONLY public.programming_type
    ADD CONSTRAINT "UQ_57d269fba4fec6d54652e339191" UNIQUE (prog_type_name);
 [   ALTER TABLE ONLY public.programming_type DROP CONSTRAINT "UQ_57d269fba4fec6d54652e339191";
       public            postgres    false    230            �           2606    237979 "   car UQ_5a4923ed240697a30e8017cd2c3 
   CONSTRAINT     e   ALTER TABLE ONLY public.car
    ADD CONSTRAINT "UQ_5a4923ed240697a30e8017cd2c3" UNIQUE (car_number);
 N   ALTER TABLE ONLY public.car DROP CONSTRAINT "UQ_5a4923ed240697a30e8017cd2c3";
       public            postgres    false    236            �           2606    238021 #   user UQ_5f0d44ba76bf00bcd1cf21a05f9 
   CONSTRAINT     f   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_5f0d44ba76bf00bcd1cf21a05f9" UNIQUE (dni_user);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_5f0d44ba76bf00bcd1cf21a05f9";
       public            postgres    false    244            �           2606    238313 ,   car_situation UQ_7ae49832f206282d81c410a1f9d 
   CONSTRAINT     k   ALTER TABLE ONLY public.car_situation
    ADD CONSTRAINT "UQ_7ae49832f206282d81c410a1f9d" UNIQUE (id_car);
 X   ALTER TABLE ONLY public.car_situation DROP CONSTRAINT "UQ_7ae49832f206282d81c410a1f9d";
       public            postgres    false    218            �           2606    238034 %   driver UQ_a315800daf79762572c3b2d2490 
   CONSTRAINT     h   ALTER TABLE ONLY public.driver
    ADD CONSTRAINT "UQ_a315800daf79762572c3b2d2490" UNIQUE (dni_driver);
 Q   ALTER TABLE ONLY public.driver DROP CONSTRAINT "UQ_a315800daf79762572c3b2d2490";
       public            postgres    false    246            �           2606    238019 #   user UQ_d34106f8ec1ebaf66f4f8609dd6 
   CONSTRAINT     g   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE (user_name);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6";
       public            postgres    false    244            �           2606    238288 )   solicitude UQ_d93adfb4b7c1e54226790347fe1 
   CONSTRAINT     j   ALTER TABLE ONLY public.solicitude
    ADD CONSTRAINT "UQ_d93adfb4b7c1e54226790347fe1" UNIQUE (id_route);
 U   ALTER TABLE ONLY public.solicitude DROP CONSTRAINT "UQ_d93adfb4b7c1e54226790347fe1";
       public            postgres    false    234            �           2606    238008 #   role UQ_dbbbe40c7e5b1b3562102dfef59 
   CONSTRAINT     e   ALTER TABLE ONLY public.role
    ADD CONSTRAINT "UQ_dbbbe40c7e5b1b3562102dfef59" UNIQUE (role_type);
 O   ALTER TABLE ONLY public.role DROP CONSTRAINT "UQ_dbbbe40c7e5b1b3562102dfef59";
       public            postgres    false    242            �           2606    237990 4   type_driver_situation UQ_ff82061c762afa9a8e561bc0abf 
   CONSTRAINT     y   ALTER TABLE ONLY public.type_driver_situation
    ADD CONSTRAINT "UQ_ff82061c762afa9a8e561bc0abf" UNIQUE (type_ds_name);
 `   ALTER TABLE ONLY public.type_driver_situation DROP CONSTRAINT "UQ_ff82061c762afa9a8e561bc0abf";
       public            postgres    false    238            �           2606    238050 +   modification FK_088abdc33019077e364846eaa06    FK CONSTRAINT     �   ALTER TABLE ONLY public.modification
    ADD CONSTRAINT "FK_088abdc33019077e364846eaa06" FOREIGN KEY (id_solicitude) REFERENCES public.solicitude(id_solicitude);
 W   ALTER TABLE ONLY public.modification DROP CONSTRAINT "FK_088abdc33019077e364846eaa06";
       public          postgres    false    228    234    4812            �           2606    238065 )   solicitude FK_1bdaa418b5587107fee7dde862f    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitude
    ADD CONSTRAINT "FK_1bdaa418b5587107fee7dde862f" FOREIGN KEY (id_aut_prog_type) REFERENCES public.programming_type(id_aut_prog_type);
 U   ALTER TABLE ONLY public.solicitude DROP CONSTRAINT "FK_1bdaa418b5587107fee7dde862f";
       public          postgres    false    234    4806    230            �           2606    238331 /   driver_situation FK_263a6cd02e51ddd131a84204a2c    FK CONSTRAINT     �   ALTER TABLE ONLY public.driver_situation
    ADD CONSTRAINT "FK_263a6cd02e51ddd131a84204a2c" FOREIGN KEY (id_driver) REFERENCES public.driver(id_driver) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.driver_situation DROP CONSTRAINT "FK_263a6cd02e51ddd131a84204a2c";
       public          postgres    false    240    4840    246            �           2606    238060 )   solicitude FK_310e12ae383df7127f5d15d19f6    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitude
    ADD CONSTRAINT "FK_310e12ae383df7127f5d15d19f6" FOREIGN KEY (id_car) REFERENCES public.car(id_car);
 U   ALTER TABLE ONLY public.solicitude DROP CONSTRAINT "FK_310e12ae383df7127f5d15d19f6";
       public          postgres    false    236    234    4816            �           2606    238035 ,   car_situation FK_39826f2d601ac23f5448d04eb41    FK CONSTRAINT     �   ALTER TABLE ONLY public.car_situation
    ADD CONSTRAINT "FK_39826f2d601ac23f5448d04eb41" FOREIGN KEY (id_aut_type_cs) REFERENCES public.type_car_situation(id_aut_type_cs);
 X   ALTER TABLE ONLY public.car_situation DROP CONSTRAINT "FK_39826f2d601ac23f5448d04eb41";
       public          postgres    false    216    218    4786            �           2606    238040 )   mod_change FK_3cf98b0808dd2fddbc1c76b9ee0    FK CONSTRAINT     �   ALTER TABLE ONLY public.mod_change
    ADD CONSTRAINT "FK_3cf98b0808dd2fddbc1c76b9ee0" FOREIGN KEY (id_aut_change_type) REFERENCES public.change_type(id_aut_change_type);
 U   ALTER TABLE ONLY public.mod_change DROP CONSTRAINT "FK_3cf98b0808dd2fddbc1c76b9ee0";
       public          postgres    false    226    4798    224            �           2606    238090 #   user FK_4a6f52fda7ebebc0a21c59b454a    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_4a6f52fda7ebebc0a21c59b454a" FOREIGN KEY (id_aut_role) REFERENCES public.role(id_aut_role);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_4a6f52fda7ebebc0a21c59b454a";
       public          postgres    false    4828    242    244            �           2606    238105 %   driver FK_58f27181ff776c8bb4392a18cf5    FK CONSTRAINT     �   ALTER TABLE ONLY public.driver
    ADD CONSTRAINT "FK_58f27181ff776c8bb4392a18cf5" FOREIGN KEY (id_car) REFERENCES public.car(id_car);
 Q   ALTER TABLE ONLY public.driver DROP CONSTRAINT "FK_58f27181ff776c8bb4392a18cf5";
       public          postgres    false    4816    236    246            �           2606    238324 ,   car_situation FK_7ae49832f206282d81c410a1f9d    FK CONSTRAINT     �   ALTER TABLE ONLY public.car_situation
    ADD CONSTRAINT "FK_7ae49832f206282d81c410a1f9d" FOREIGN KEY (id_car) REFERENCES public.car(id_car) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.car_situation DROP CONSTRAINT "FK_7ae49832f206282d81c410a1f9d";
       public          postgres    false    4816    218    236            �           2606    238045 )   mod_change FK_97f8cedce27b31024e82eaa8714    FK CONSTRAINT     �   ALTER TABLE ONLY public.mod_change
    ADD CONSTRAINT "FK_97f8cedce27b31024e82eaa8714" FOREIGN KEY (id_modification) REFERENCES public.modification(id_modification);
 U   ALTER TABLE ONLY public.mod_change DROP CONSTRAINT "FK_97f8cedce27b31024e82eaa8714";
       public          postgres    false    4804    226    228            �           2606    238095 #   user FK_c3a71cf1400768819eedbc1dd47    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c3a71cf1400768819eedbc1dd47" FOREIGN KEY (id_driver) REFERENCES public.driver(id_driver);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_c3a71cf1400768819eedbc1dd47";
       public          postgres    false    246    244    4840            �           2606    238291 )   solicitude FK_d93adfb4b7c1e54226790347fe1    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitude
    ADD CONSTRAINT "FK_d93adfb4b7c1e54226790347fe1" FOREIGN KEY (id_route) REFERENCES public.route(id_route);
 U   ALTER TABLE ONLY public.solicitude DROP CONSTRAINT "FK_d93adfb4b7c1e54226790347fe1";
       public          postgres    false    232    234    4810            �           2606    238070 )   solicitude FK_def7abf47f45ae7fd99e7b2707a    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitude
    ADD CONSTRAINT "FK_def7abf47f45ae7fd99e7b2707a" FOREIGN KEY (id_group) REFERENCES public.group_tour(id_group);
 U   ALTER TABLE ONLY public.solicitude DROP CONSTRAINT "FK_def7abf47f45ae7fd99e7b2707a";
       public          postgres    false    222    234    4796            �           2606    238085 /   driver_situation FK_e20c1cf663d8ea6a41b9427dab2    FK CONSTRAINT     �   ALTER TABLE ONLY public.driver_situation
    ADD CONSTRAINT "FK_e20c1cf663d8ea6a41b9427dab2" FOREIGN KEY (id_aut_type_ds) REFERENCES public.type_driver_situation(id_aut_type_ds);
 [   ALTER TABLE ONLY public.driver_situation DROP CONSTRAINT "FK_e20c1cf663d8ea6a41b9427dab2";
       public          postgres    false    238    240    4820            �   �   x�͓��0E��+Lg0���L\�4t�A4�51��j��0�@�����wY��2�m�P��*^
�S�
�.��: Z�^	#yْ
qHӐE$ ��Z6�G����~�/O��L��k�GtoVߋ-o�Y:#�Zj�uA�I��T�\ܔ8�!��˴OӚ}�
̨kAD�A�|��`5H��f�+�^Re�P��6�cZ,�4-�eZ��p|Z�7���%��	D.��      �   /   x�3��4202�5��56�3�L9�9��L�B��Fh�\1z\\\ qK
�      �   S   x���	�0�s�):���6^BZ�6%u3Gp1����$\/�CL�q�#�uLT��7�*j���e�E��b���a%)�'�6 x1K�      �   �   x�mϻ�0 њ�"X�G�DΒF���G��.v�����n�7�KVO��<`Ѳs�By*��j
q��5��4͒[1r�ic�6��Q-k-^:���vW5�R��*,;�F%��2O��=�},B؀�G��k��F��6)��c�5P      �      x������ � �      �   �   x�͏�
�0Dϛ�ȹ�$�M�֛��B���������n���*�v�afW��bQ)�$�����
�3��n]�y6��ѧWe�c�ӭ�8Z�`�̙�N3�ޣ�d1Or<𑦃���v��r�3C�w�V̟栝�1Mc�d�@/�-�rQA�R����|JQ�Sȯ���Rd����O�:qK63B��~�      �   0   x�3��4202�5��56�3�L9�8-�-�b��F���\1z\\\ �.,      �      x�3�4�t-.H<�1��М+F��� 9��      �      x������ � �      �      x������ � �      �   9   x�3�,)J�+NK-�2�,�,�,I�2�L�,J.�,��2�L�H.-*�<�9�+F��� ��      �   2   x�3�LL����,.)JL�/�2�L��OK-�2�L�,JM.�,������ /)      �      x������ � �      �      x������ � �      �   #   x�3�,I��I-�,�2�LIU(�L�Jrb���� ~��      �   )   x�34�,KLNL���K-�,�24�LIU(�L�J�b���� �B	�      �   n   x�34�L��I��T1JR14P��u����.v*�*�OI7.wL5�r)����L5H5��N�,��J�LOp*6*�40207�4�0�0�4��鐞����s�b���� q R     