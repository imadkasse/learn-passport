import { StudentService } from './student.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [],
    providers: [
        StudentService, ],
})
export class StudentModule {}
