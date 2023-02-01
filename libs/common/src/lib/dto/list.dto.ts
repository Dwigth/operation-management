import { ApiProperty } from "@nestjs/swagger";

export class ListQuery {
    @ApiProperty()
    take: number;
    @ApiProperty({required: false})
    skip: number;
}