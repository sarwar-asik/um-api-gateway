import { RedisClient } from '../../../shared/redis';
import { StudentsService } from './Students.service';
import { EVENT_STUDENT_CREATED } from './student.constent';

const initStudentEvents = () => {
  RedisClient.subscribe(EVENT_STUDENT_CREATED, async (e: string) => {
    const data = JSON.parse(e);
    console.log(data);

    await StudentsService.CreateStudentFromEvent(data);
  });
};

export default initStudentEvents;
