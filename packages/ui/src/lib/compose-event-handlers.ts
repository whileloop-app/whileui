type EventHandler<E> = ((event: E) => void) | null | undefined;

function isDefaultPrevented(event: unknown): boolean {
  if (!event || typeof event !== 'object') return false;

  if ('defaultPrevented' in event && typeof event.defaultPrevented === 'boolean') {
    return event.defaultPrevented;
  }

  if ('isDefaultPrevented' in event && typeof event.isDefaultPrevented === 'function') {
    return Boolean(event.isDefaultPrevented());
  }

  return false;
}

export function composeEventHandlers<E>(
  userHandler?: EventHandler<E>,
  internalHandler?: EventHandler<E>,
  { checkForDefaultPrevented = true }: { checkForDefaultPrevented?: boolean } = {}
) {
  return (event: E) => {
    userHandler?.(event);

    if (checkForDefaultPrevented && isDefaultPrevented(event)) {
      return;
    }

    internalHandler?.(event);
  };
}
