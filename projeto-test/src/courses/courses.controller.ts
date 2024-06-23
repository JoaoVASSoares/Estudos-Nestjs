import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCoursesDTO } from "./dto/createCourses.dto";
import { UpdateCoursesDTO } from "./dto/updateCourse.dto";

@Controller("courses")
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.courseService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateCoursesDTO) {
    return this.courseService.create(body);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() body: UpdateCoursesDTO) {
    return this.courseService.update(id, body);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string) {
    return this.courseService.remove(id);
  }
}
