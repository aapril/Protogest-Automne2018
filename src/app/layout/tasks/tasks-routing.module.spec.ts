import { TasksRoutingModule } from './tasks-routing.module';

describe('TasksRoutingModule', () => {
  let tasksRoutingModule: TasksRoutingModule;

  beforeEach(() => {
    tasksRoutingModule = new TasksRoutingModule();
  });

  it('should create an instance', () => {
    expect(tasksRoutingModule).toBeTruthy();
  });
});
