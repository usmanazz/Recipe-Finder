CREATE DATABASE recipe-finder;

-- CREATE TABLE users (
--     user_id SERIAL PRIMARY KEY,
--     user_name VARCHAR(255) NOT NULL,
--     user_email VARCHAR(255) NOT NULL,
--     user_password VARCHAR(255) NOT NULL
-- );

------- CREATE TABLES FOR DB ------------
CREATE TABLE users (
    user_id SERIAL,
    user_email VARCHAR(255) PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE recipes (
    recipe_id INT PRIMARY KEY,
    recipe_info TEXT NOT NULL
);

CREATE TABLE favorites (
    user_email VARCHAR(255) REFERENCES users (user_email),
    recipe_id INT REFERENCES recipes (recipe_id),
    CONSTRAINT favorites_pkey PRIMARY KEY (user_email, recipe_id)
);


----------- INSERT USERS TO users table ------------
insert into users (user_email, user_name, user_password)
values ('bob@gmail.com', 'bob', '123');

insert into users (user_email, user_name, user_password)
values ('bill@gmail.com', 'bill', '123'); 

insert into users (user_email, user_name, user_password)
values ('sara@gmail.com', 'sara', '123');

insert into users (user_email, user_name, user_password)
values ('sam@gmail.com', 'sam', '123'); */


----------- INSERT RECIPES to recipes table ------------
insert into recipes (recipe_id, recipe_info)
values (102, 'chicken alfredo'); */

insert into recipes (recipe_id, recipe_info)
values (30, 'pasta with steak');

insert into recipes (recipe_id, recipe_info)
values (40, 'cheesburger');

insert into recipes (recipe_id, recipe_info)
values (67, 'salmon sushi');


---------- QUERIES TO GET recipes favorited by user ------------
select users.user_email, recipes.recipe_info
from users
inner join favorites
on users.user_email = favorites.user_email
inner join recipes
on favorites.recipe_id = recipes.recipe_id
where users.user_email = 'sara@gmail.com';

select users.user_email, recipes.recipe_info
from users
inner join favorites
on users.user_email = favorites.user_email
inner join recipes
on favorites.recipe_id = recipes.recipe_id
where users.user_email = 'bill@gmail.com';