import { randomUUID } from "node:crypto";
import { CoursesService } from "./courses.service";
import { CreateCoursesDTO } from "./dto/createCourses.dto";
import { UpdateCoursesDTO } from "./dto/updateCourse.dto";

describe("CoursesService unit tests", () => {
  let service: CoursesService;
  let id: string;
  let created_at: Date;
  let expectOutputTags: any;
  let expectOutputCourses: any;
  let mockCourseRepository: any;
  let mockTagRepository: any;

  beforeEach(async () => {
    service = new CoursesService();
    id = randomUUID();
    created_at = new Date();
    expectOutputTags = [
      {
        id,
        name: "nestJs",
        created_at,
      },
    ];
    expectOutputCourses = [
      {
        id,
        name: "test",
        description: "test description",
        created_at,
        tags: expectOutputTags,
      },
    ];
    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    };

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a course", async () => {
    //@ts-expect-error difined part of methodos
    service["courseRepository"] = mockCourseRepository;
    //@ts-expect-error difined part of methodos
    service["tagRepository"] = mockTagRepository;

    const createCourseDTO: CreateCoursesDTO = {
      name: "test",
      description: "test description",
      tags: ["nestjs"],
    };

    const newCourse = await service.create(createCourseDTO);

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(newCourse);
  });

  it("should list all course", async () => {
    //@ts-expect-error difined part of methodos
    service["courseRepository"] = mockCourseRepository;
    //@ts-expect-error difined part of methodos
    service["tagRepository"] = mockTagRepository;

    const courses = await service.findAll();

    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(courses);
  });

  it("should gets a course by id", async () => {
    //@ts-expect-error difined part of methodos
    service["courseRepository"] = mockCourseRepository;
    //@ts-expect-error difined part of methodos
    service["tagRepository"] = mockTagRepository;

    const course = await service.findOne(id);

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);
  });

  it("should update a course", async () => {
    //@ts-expect-error difined part of methodos
    service["courseRepository"] = mockCourseRepository;
    //@ts-expect-error difined part of methodos
    service["tagRepository"] = mockTagRepository;

    const createCourseDTO: UpdateCoursesDTO = {
      name: "test",
      description: "test description",
      tags: ["nestjs"],
    };

    const course = await service.update(id, UpdateCoursesDTO);

    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(mockCourseRepository.preload).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);
  });

  it("should delete course", async () => {
    //@ts-expect-error difined part of methodos
    service["courseRepository"] = mockCourseRepository;
    //@ts-expect-error difined part of methodos
    service["tagRepository"] = mockTagRepository;

    const course = await service.remove(id);

    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(mockCourseRepository.remove).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);
  });
});
