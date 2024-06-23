import { PartialType } from "@nestjs/mapped-types";
import { CreateCoursesDTO } from "./createCourses.dto";

export class UpdateCoursesDTO extends PartialType(CreateCoursesDTO) {}
