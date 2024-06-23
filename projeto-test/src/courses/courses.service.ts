import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Course } from "./entities/courses.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "./entities/tag.entity";
import { CreateCoursesDTO } from "./dto/createCourses.dto";
import { UpdateCoursesDTO } from "./dto/updateCourse.dto";

@Injectable()
export class CoursesService {
  @InjectRepository(Course)
  private readonly courseRepository: Repository<Course>;
  @InjectRepository(Tag)
  private readonly tagRepository: Repository<Tag>;

  async findAll() {
    return this.courseRepository.find({ relations: ["tags"] });
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ["tags"],
    });
    if (!course) {
      throw new HttpException("Nenhum curso encontrado", HttpStatus.NOT_FOUND);
    }
    return course;
  }

  async create(createCourseDTO: CreateCoursesDTO) {
    const tags = await Promise.all(createCourseDTO.tags.map(name => this.preloadTagByName(name)));

    const course = this.courseRepository.create({
      ...createCourseDTO,
      tags,
    });

    return this.courseRepository.save(course);
  }

  async update(id: string, updateCurseDTO: UpdateCoursesDTO) {
    const tags = updateCurseDTO.tags && (await Promise.all(updateCurseDTO.tags.map(name => this.preloadTagByName(name))));

    const course = await this.courseRepository.preload({
      ...updateCurseDTO,
      id,
      tags,
    });

    if (!course) {
      throw new HttpException("Nenhum curso encontrado", HttpStatus.NOT_FOUND);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });

    if (!course) {
      throw new HttpException("Nenhum curso encontrado", HttpStatus.NOT_FOUND);
    }

    return this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });

    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name });
  }
}
