import { registerEnumType } from "@nestjs/graphql";

export enum Sort {
    ASC,
    DESC,
}

registerEnumType(Sort, {
    name: 'Sort',
    description: 'Define attribute to order from.',
});