export class ListNewsModel {
    NewsId: number;
    NameNews: string;
    Detail: string;
    Status: number;
    UpdatedDate: Date;
    ButtonView: number;
    ButtonEdit: number;
    ButtonDelete: number;
}

export class NewsResponseModel {
    successful: boolean;
    data: ListNewsModel[];
}

export class UpdateStatusNewsResponse {
    successful: boolean;
}