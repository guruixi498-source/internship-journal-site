-- Supabase SQL Editor 中执行本文件，用于开启跨设备云同步。
-- 数据按用户隔离：每个登录账号只能读取和更新自己的 journal_data 行。

create table if not exists public.journal_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.journal_data enable row level security;

drop policy if exists "Users can read their own journal data" on public.journal_data;
create policy "Users can read their own journal data"
  on public.journal_data
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own journal data" on public.journal_data;
create policy "Users can insert their own journal data"
  on public.journal_data
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own journal data" on public.journal_data;
create policy "Users can update their own journal data"
  on public.journal_data
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own journal data" on public.journal_data;
create policy "Users can delete their own journal data"
  on public.journal_data
  for delete
  using (auth.uid() = user_id);
