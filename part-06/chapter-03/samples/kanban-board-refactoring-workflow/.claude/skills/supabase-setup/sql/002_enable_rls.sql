-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

-- ============================================
-- BOARDS RLS POLICIES
-- ============================================

-- Users can view their own boards
CREATE POLICY "Users can view own boards"
  ON public.boards FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own boards
CREATE POLICY "Users can insert own boards"
  ON public.boards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own boards
CREATE POLICY "Users can update own boards"
  ON public.boards FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own boards
CREATE POLICY "Users can delete own boards"
  ON public.boards FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- CARDS RLS POLICIES
-- ============================================

-- Users can view cards from their own boards
CREATE POLICY "Users can view cards from own boards"
  ON public.cards FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.boards
      WHERE boards.id = cards.board_id
      AND boards.user_id = auth.uid()
    )
  );

-- Users can insert cards to their own boards
CREATE POLICY "Users can insert cards to own boards"
  ON public.cards FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.boards
      WHERE boards.id = cards.board_id
      AND boards.user_id = auth.uid()
    )
  );

-- Users can update cards from their own boards
CREATE POLICY "Users can update cards from own boards"
  ON public.cards FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.boards
      WHERE boards.id = cards.board_id
      AND boards.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.boards
      WHERE boards.id = cards.board_id
      AND boards.user_id = auth.uid()
    )
  );

-- Users can delete cards from their own boards
CREATE POLICY "Users can delete cards from own boards"
  ON public.cards FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.boards
      WHERE boards.id = cards.board_id
      AND boards.user_id = auth.uid()
    )
  );
