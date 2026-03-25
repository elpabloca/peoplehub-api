import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    const user = await this.userRepository.findOne({
      where: { id: createPostDto.userId },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const newPost = this.postsRepository.create({
      title: createPostDto.title,
      content: createPostDto.content,
      userId: user.id,
    });
    return await this.postsRepository.save(newPost);
  }

  findAll() {
    const posts = this.postsRepository.find({
      relations: ['user'],
    });
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }
}
