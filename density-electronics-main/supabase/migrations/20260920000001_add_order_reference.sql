alter table public.orders
  add column if not exists order_reference text;

create unique index if not exists orders_order_reference_key
  on public.orders (order_reference)
  where order_reference is not null;