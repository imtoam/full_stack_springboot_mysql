create database if not exists web;
use web;

create table if not exists todos
(
    id int auto_increment not null,
    task varchar(200) not null,
    due date not null,
    isdone bool default false,
    constraint pk_todo primary key (id)
);

insert into todos(task, due)
	value('learn spring boot', '2021-07-05');
insert into todos(task, due)
	value('learn angular native', '2021-07-05');
insert into todos(task, due)
	value('learn react native', '2021-07-05');
insert into todos(task, due)
	value('fullstack react+springboot', '2021-07-01');
insert into todos(task, due)
	value('fullstack angular+springboot', '2021-07-01');
select * from todos;
