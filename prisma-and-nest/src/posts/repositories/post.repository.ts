import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "../dto/create-post.dto";
import { PostEntity } from "../entities/post.entity";
import { UpdatePostDto } from "../dto/update-post.dto";
import { NotFoundError } from "src/common/errors/types/NotFoundError";

@Injectable()
export class PostRepository {
  constructor(private readonly prismaRepository: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { authorEmail } = createPostDto;

    delete createPostDto.authorEmail;

    const user = await this.prismaRepository.user.findUnique({
      where: {
        email: authorEmail,
      },
    });

    if (!user) throw new NotFoundError("Author not found.");

    const data: Prisma.PostCreateInput = {
      ...createPostDto,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    };

    return await this.prismaRepository.post.create({
      data: data,
    });
  }

  async findAll(): Promise<PostEntity[]> {
    return this.prismaRepository.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<PostEntity> {
    return this.prismaRepository.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const { authorEmail } = updatePostDto;

    if (!authorEmail) {
      return this.prismaRepository.post.update({
        data: updatePostDto,
        where: {
          id: id,
        },
      });
    }

    delete updatePostDto.authorEmail;

    const user = await this.prismaRepository.user.findUnique({
      where: {
        email: authorEmail,
      },
    });

    if (!user) throw new NotFoundError("Author not found.");

    const data: Prisma.PostUpdateInput = {
      ...updatePostDto,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    };

    return this.prismaRepository.post.update({
      where: {
        id: id,
      },
      data: data,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<PostEntity> {
    return await this.prismaRepository.post.delete({
      where: {
        id: id,
      },
    });
  }
}
