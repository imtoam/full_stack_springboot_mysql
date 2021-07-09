use web;

create table if not exists users
(
    id int auto_increment not null,
    email varchar(50) not null,
    username varchar(50) not null,
    password varchar(120) not null,
    constraint pk_user primary key (id),
    constraint uq_email unique (email),
    constraint uq_uname unique (username)
);

create table if not exists roles
(
    id int auto_increment not null,
    name varchar(50) not null,
    constraint pk_role primary key (id)
);

create table if not exists user_roles
(
    user_id int not null,
    role_id int not null,
    constraint fk_user foreign key (user_id) references users (id),
    constraint fk_role foreign key (role_id) references roles (id)
);

INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_CREATE');
INSERT INTO roles(name) VALUES('ROLE_EDIT');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');