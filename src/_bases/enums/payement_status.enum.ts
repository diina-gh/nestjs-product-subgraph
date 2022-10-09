import { registerEnumType } from "@nestjs/graphql";

export enum PayementStatus {
    PENDING,
    COMPLETED,
    CANCELED,
}

registerEnumType(PayementStatus, {
    name: 'PayementStatus',
    description: 'Define a given payement status.',
});