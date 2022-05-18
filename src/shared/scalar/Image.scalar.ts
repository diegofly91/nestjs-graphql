import { Scalar, CustomScalar } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

export type ImageProps = Promise<FileUpload>;

@Scalar('Image')
export class Image implements CustomScalar<ImageProps, ImageProps> {
    description = 'Upload custom scalar type';
    supportedFormats = ['image/jpg', 'image/jpeg', 'image/png'];

    async parseValue(value: any) {
        const { file } = await value;
        const { filename, mimetype } = file;
        if (!this.supportedFormats.includes(mimetype))
            throw new BadRequestException(`Unsupported file format. Supports: ${this.supportedFormats.join(' ')}.`);
        return file;
    }

    serialize(value: any) {
        return GraphQLUpload.serialize(value?.file);
    }

    parseLiteral(ast: any) {
        return GraphQLUpload.parseLiteral(ast, ast.value?.file);
    }
}
