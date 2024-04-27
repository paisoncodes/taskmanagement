import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatusEnum } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatusEnum.OPEN,
    TaskStatusEnum.IN_PROGRESS,
    TaskStatusEnum.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not a valid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);

    return idx !== -1;
  }
}
