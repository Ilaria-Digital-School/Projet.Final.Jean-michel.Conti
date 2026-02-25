export class CreateCommentDto {
    content: string;
    artworkId?: number;
    artworkSlug?: string;
    articleId?: number;
    artistId?: number;
}