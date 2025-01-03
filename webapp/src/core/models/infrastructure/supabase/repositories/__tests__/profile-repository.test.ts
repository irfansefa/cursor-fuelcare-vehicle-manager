import { SupabaseClient } from '@supabase/supabase-js';
import { Profile } from '../../../../domain/entities';
import { SupabaseProfileRepository } from '../profile-repository';

jest.mock('@supabase/supabase-js');

describe('SupabaseProfileRepository', () => {
  let client: jest.Mocked<SupabaseClient>;
  let repository: SupabaseProfileRepository;
  
  const mockProfile: Profile = {
    id: '123',
    username: 'johndoe',
    full_name: 'John Doe',
    avatar_url: 'https://example.com/avatar.jpg',
    created_at: '2023-01-15',
    updated_at: '2023-01-15',
  };

  beforeEach(() => {
    client = {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockProfile, error: null }),
          }),
        }),
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: mockProfile, error: null }),
          }),
        }),
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: mockProfile, error: null }),
            }),
          }),
        }),
      }),
    } as unknown as jest.Mocked<SupabaseClient>;

    repository = new SupabaseProfileRepository(client);
  });

  describe('getById', () => {
    it('should return a profile when found', async () => {
      const result = await repository.getById('123');
      expect(result).toEqual(mockProfile);
      expect(client.from).toHaveBeenCalledWith('profiles');
    });

    it('should return null when profile not found', async () => {
      client.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: null }),
          }),
        }),
      });

      const result = await repository.getById('nonexistent');
      expect(result).toBeNull();
    });

    it('should throw error when Supabase returns an error', async () => {
      client.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: new Error('Database error') }),
          }),
        }),
      });

      await expect(repository.getById('123')).rejects.toThrow('Database error');
    });
  });

  describe('getByUsername', () => {
    it('should return a profile when found', async () => {
      const result = await repository.getByUsername('johndoe');
      expect(result).toEqual(mockProfile);
      expect(client.from).toHaveBeenCalledWith('profiles');
    });

    it('should return null when username not found', async () => {
      client.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: null }),
          }),
        }),
      });

      const result = await repository.getByUsername('nonexistent');
      expect(result).toBeNull();
    });

    it('should throw error when Supabase returns an error', async () => {
      client.from = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: new Error('Database error') }),
          }),
        }),
      });

      await expect(repository.getByUsername('johndoe')).rejects.toThrow('Database error');
    });
  });

  describe('create', () => {
    it('should create and return a new profile', async () => {
      const { id, created_at, updated_at, ...createData } = mockProfile;
      const result = await repository.create('user123', createData);
      expect(result).toEqual(mockProfile);
      expect(client.from).toHaveBeenCalledWith('profiles');
    });

    it('should throw error when creation fails', async () => {
      client.from = jest.fn().mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: new Error('Failed to create profile') }),
          }),
        }),
      });

      const { id, created_at, updated_at, ...createData } = mockProfile;
      await expect(repository.create('user123', createData)).rejects.toThrow('Failed to create profile');
    });

    it('should throw error when data is null', async () => {
      client.from = jest.fn().mockReturnValue({
        insert: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ data: null, error: null }),
          }),
        }),
      });

      const { id, created_at, updated_at, ...createData } = mockProfile;
      await expect(repository.create('user123', createData)).rejects.toThrow('Failed to create profile');
    });

    it('should include userId as id in the created profile', async () => {
      const { id, created_at, updated_at, ...createData } = mockProfile;
      const userId = 'user123';

      await repository.create(userId, createData);

      const insertCall = (client.from('profiles').insert as jest.Mock).mock.calls[0][0];
      expect(insertCall).toHaveProperty('id', userId);
    });
  });

  describe('update', () => {
    it('should update and return the profile', async () => {
      const updateData = { full_name: 'John Smith', avatar_url: 'https://example.com/new-avatar.jpg' };
      const updatedProfile = { ...mockProfile, ...updateData };

      client.from = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: updatedProfile, error: null }),
            }),
          }),
        }),
      });

      const result = await repository.update('123', updateData);
      expect(result).toEqual(updatedProfile);
      expect(client.from).toHaveBeenCalledWith('profiles');
    });

    it('should throw error when update fails', async () => {
      client.from = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: null, error: new Error('Failed to update profile') }),
            }),
          }),
        }),
      });

      await expect(repository.update('123', { full_name: 'John Smith' }))
        .rejects.toThrow('Failed to update profile');
    });

    it('should throw error when data is null', async () => {
      client.from = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: null, error: null }),
            }),
          }),
        }),
      });

      await expect(repository.update('123', { full_name: 'John Smith' }))
        .rejects.toThrow('Failed to update profile');
    });

    it('should handle partial updates', async () => {
      const updateData = { full_name: 'John Smith' };
      const updatedProfile = { ...mockProfile, ...updateData };

      client.from = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({ data: updatedProfile, error: null }),
            }),
          }),
        }),
      });

      const result = await repository.update('123', updateData);
      expect(result).toEqual(updatedProfile);
      expect(client.from).toHaveBeenCalledWith('profiles');
    });
  });
}); 