export interface Database {
  public: {
    Tables: {
      jokes: {
        Row: {
          id: string;
          content: string;
          category: string;
          author_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          content: string;
          category: string;
          author_id: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
      };
      votes: {
        Row: {
          id: string;
          joke_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          joke_id: string;
          user_id: string;
          created_at?: string;
        };
      };
    };
  };
}