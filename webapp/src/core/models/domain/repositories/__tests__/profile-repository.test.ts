import { Profile } from '../../entities';
import { ProfileRepository } from '../profile-repository';

describe('ProfileRepository', () => {
  let repository: ProfileRepository;
  const mockProfile: Profile = {
    id: '123',
    username: 'johndoe',
    full_name: 'John Doe',
    avatar_url: 'https://example.com/avatar.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  beforeEach(() => {
    repository = {
      getById: jest.fn(),
      getByUsername: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  });

  describe('getById', () => {
    it('should return a profile when found', async () => {
      (repository.getById as jest.Mock).mockResolvedValue(mockProfile);
      const result = await repository.getById('123');
      expect(result).toEqual(mockProfile);
      expect(repository.getById).toHaveBeenCalledWith('123');
    });

    it('should return null when profile not found', async () => {
      (repository.getById as jest.Mock).mockResolvedValue(null);
      const result = await repository.getById('nonexistent');
      expect(result).toBeNull();
      expect(repository.getById).toHaveBeenCalledWith('nonexistent');
    });
  });

  describe('getByUsername', () => {
    it('should return a profile when found', async () => {
      (repository.getByUsername as jest.Mock).mockResolvedValue(mockProfile);
      const result = await repository.getByUsername('johndoe');
      expect(result).toEqual(mockProfile);
      expect(repository.getByUsername).toHaveBeenCalledWith('johndoe');
    });

    it('should return null when username not found', async () => {
      (repository.getByUsername as jest.Mock).mockResolvedValue(null);
      const result = await repository.getByUsername('nonexistent');
      expect(result).toBeNull();
      expect(repository.getByUsername).toHaveBeenCalledWith('nonexistent');
    });
  });

  describe('create', () => {
    it('should create and return a new profile', async () => {
      const { ...createData } = mockProfile;
      const userId = 'user123';
      (repository.create as jest.Mock).mockResolvedValue(mockProfile);
      
      const result = await repository.create(userId, createData);
      expect(result).toEqual(mockProfile);
      expect(repository.create).toHaveBeenCalledWith(userId, createData);
    });
  });

  describe('update', () => {
    it('should update and return the profile', async () => {
      const updateData = { full_name: 'John Smith', avatar_url: 'https://example.com/new-avatar.jpg' };
      const updatedProfile = { ...mockProfile, ...updateData };
      (repository.update as jest.Mock).mockResolvedValue(updatedProfile);
      
      const result = await repository.update('123', updateData);
      expect(result).toEqual(updatedProfile);
      expect(repository.update).toHaveBeenCalledWith('123', updateData);
    });

    it('should handle partial updates', async () => {
      const updateData = { full_name: 'John Smith' };
      const updatedProfile = { ...mockProfile, ...updateData };
      (repository.update as jest.Mock).mockResolvedValue(updatedProfile);
      
      const result = await repository.update('123', updateData);
      expect(result).toEqual(updatedProfile);
      expect(repository.update).toHaveBeenCalledWith('123', updateData);
    });
  });
}); 