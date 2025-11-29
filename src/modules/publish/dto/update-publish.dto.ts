import { PartialType } from '@nestjs/mapped-types';
import { PublishJobDto } from './publish-job.dto';

export class UpdatePublishDto extends PartialType(PublishJobDto) {}
