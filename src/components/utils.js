function isPresentInState(data, state) {
    return state.some((card) => card.slug === data.slug);
  }

  export {isPresentInState,};
