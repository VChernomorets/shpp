create table users (
id int(10) unsigned auto_increment primary key,
username char(255) not null,
pass char(255) not null,
hash char(255) not null
);

create table messages(
id int(10) unsigned auto_increment primary key,
date int(10) not null,
username char(255) not null,
messages text not null
);