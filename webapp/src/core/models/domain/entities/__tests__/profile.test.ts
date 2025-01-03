import { Profile } from '../profile';

describe('Profile Entity', () => {
  const validProfileData: Profile = {
    id: '123',
    username: 'johndoe',
    full_name: 'John Doe',
    avatar_url: 'https://example.com/avatar.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  describe('Profile Creation', () => {
    it('should create a valid profile with all required properties', () => {
      const profile: Profile = { ...validProfileData };
      expect(profile).toMatchObject(validProfileData);
    });

    it('should have all required properties', () => {
      const profile: Profile = { ...validProfileData };
      const requiredProperties = [
        'id',
        'username',
        'full_name',
        'created_at',
        'updated_at',
      ];

      requiredProperties.forEach(prop => {
        expect(profile).toHaveProperty(prop);
      });
    });

    it('should allow null for avatar_url', () => {
      const profile: Profile = {
        ...validProfileData,
        avatar_url: null,
      };

      expect(profile.avatar_url).toBeNull();
    });
  });

  describe('Profile Properties', () => {
    it('should have a valid username format', () => {
      const profile: Profile = { ...validProfileData };
      expect(profile.username).toBeTruthy();
      expect(profile.username.length).toBeGreaterThan(0);
      expect(typeof profile.username).toBe('string');
      // Username should be alphanumeric with underscores
      expect(profile.username).toMatch(/^[a-zA-Z0-9_]+$/);
    });

    it('should have a valid full name', () => {
      const profile: Profile = { ...validProfileData };
      expect(profile.full_name).toBeTruthy();
      expect(profile.full_name.length).toBeGreaterThan(0);
      expect(typeof profile.full_name).toBe('string');
    });

    it('should have valid timestamp formats', () => {
      const profile: Profile = { ...validProfileData };
      expect(() => new Date(profile.created_at)).not.toThrow();
      expect(() => new Date(profile.updated_at)).not.toThrow();
    });

    it('should have a valid avatar URL when provided', () => {
      const profile: Profile = { ...validProfileData };
      if (profile.avatar_url !== null) {
        expect(typeof profile.avatar_url).toBe('string');
        expect(profile.avatar_url).toMatch(/^https?:\/\/.+/);
      }
    });
  });

  describe('Type Checking', () => {
    it('should have correct types for all properties', () => {
      const profile: Profile = { ...validProfileData };
      
      expect(typeof profile.id).toBe('string');
      expect(typeof profile.username).toBe('string');
      expect(typeof profile.full_name).toBe('string');
      expect(typeof profile.created_at).toBe('string');
      expect(typeof profile.updated_at).toBe('string');
    });

    it('should handle optional avatar_url correctly', () => {
      const profile: Profile = { ...validProfileData };
      
      if (profile.avatar_url !== null) {
        expect(typeof profile.avatar_url).toBe('string');
      }
    });
  });
}); 