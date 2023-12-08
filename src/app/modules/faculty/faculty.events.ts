import { RedisClient } from '../../../shared/redis';
import {
  EVENT_FACULTY_CREATED,
  EVENT_FACULTY_UPDATED,
} from './faculty.constants';
import { FacultyService } from './faculty.service';

const initFacultyEvent = () => {
  RedisClient.subscribe(EVENT_FACULTY_CREATED, async (e: string) => {
    const data = JSON.parse(e);
    console.log(data);

    await FacultyService.createFacultyFromEvent(data);
  });

  RedisClient.subscribe(EVENT_FACULTY_UPDATED, async (e: string) => {
    const data = JSON.parse(e);
    console.log(data);

    await FacultyService.updateFacultyFromEvent(data);
  });
};

export default initFacultyEvent;
