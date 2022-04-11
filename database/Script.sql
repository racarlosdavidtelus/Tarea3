create table user(
	id int not null primary key auto_increment,
    name varchar(50),
    email varchar(50),
    password varchar(50),
    rol varchar(50)
);

ENGINE = INNODB;