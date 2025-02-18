
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvkjnsvngojjupifjazd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2a2puc3ZuZ29qanVwaWZqYXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NDEzODUsImV4cCI6MjA1NTExNzM4NX0.QuM-PP5OKsBEoD8JGDzqgmr63FdIhoIT6LMYhpWLjy8';

export const supabase = createClient(supabaseUrl, supabaseKey);
