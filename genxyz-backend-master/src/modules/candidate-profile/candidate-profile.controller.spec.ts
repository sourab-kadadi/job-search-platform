import { Test, TestingModule } from '@nestjs/testing';
import { CandidateProfileController } from './candidate-profile.controller';

describe('CandidateProfile Controller', () => {
  let controller: CandidateProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidateProfileController],
    }).compile();

    controller = module.get<CandidateProfileController>(CandidateProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
