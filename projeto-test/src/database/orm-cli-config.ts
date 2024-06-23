import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { CreateCoursesTable1716939209885 } from "src/migrations/1716939209885-CreateCoursesTable";
import { CreateTagsTable1716947220215 } from "src/migrations/1716947220215-CreateTagsTable";
import { CreateCoursesTagsTable1716948329801 } from "src/migrations/1716948329801-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTag1717023646077 } from "src/migrations/1717023646077-AddCoursesIdToCoursesTag";
import { AddTagsIdToCoursesTag1717024861097 } from "src/migrations/1717024861097-AddTagsIdToCoursesTag";
import { Course } from "src/courses/entities/courses.entity";
import { Tag } from "src/courses/entities/tag.entity";

export const dataSurceOption: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false,
};

export const dataSource = new DataSource({
  ...dataSurceOption,
  synchronize: false,
  migrations: [
    CreateCoursesTable1716939209885,
    CreateTagsTable1716947220215,
    CreateCoursesTagsTable1716948329801,
    AddCoursesIdToCoursesTag1717023646077,
    AddTagsIdToCoursesTag1717024861097,
  ],
});
