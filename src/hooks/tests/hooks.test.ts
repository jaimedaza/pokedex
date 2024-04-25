import { renderHook, act } from "@testing-library/react";
import useLoading from "../useLoading";
import usePagination from "../usePagination";
import useFavorites from "../useFavorites";
import { useLogin } from "../useLogin";

// useLoading
describe("useLoading", () => {
  it("initializes isLoading state to false", () => {
    const { result } = renderHook(() => useLoading());
    expect(result.current.isLoading).toBe(false);
  });

  it("sets isLoading to true when startLoading is called", () => {
    const { result } = renderHook(() => useLoading());
    act(() => {
      result.current.startLoading();
    });
    expect(result.current.isLoading).toBe(true);
  });

  it("sets isLoading to false when stopLoading is called", () => {
    const { result } = renderHook(() => useLoading());
    act(() => {
      result.current.startLoading();
      result.current.stopLoading();
    });
    expect(result.current.isLoading).toBe(false);
  });
});

// usePagination
describe("usePagination hook", () => {
  test("should initialize with the correct initial page", () => {
    const { result } = renderHook(() => usePagination({ totalPages: 10 }));
    expect(result.current.currentPage).toBe(1);
  });

  test("should go to the previous page", () => {
    const { result } = renderHook(() => usePagination({ totalPages: 10 }));
    act(() => {
      result.current.goToPage(3);
      result.current.handlePreviousPage();
    });
    expect(result.current.currentPage).toBe(2);
  });

  test("should go to the next page", () => {
    const { result } = renderHook(() => usePagination({ totalPages: 10 }));
    act(() => {
      result.current.goToPage(3);
      result.current.handleNextPage();
    });
    expect(result.current.currentPage).toBe(4);
  });

  test("should go to the specified page number", () => {
    const { result } = renderHook(() => usePagination({ totalPages: 10 }));
    act(() => {
      result.current.goToPage(5);
    });
    expect(result.current.currentPage).toBe(5);
  });

  test("should not go below the first page", () => {
    const { result } = renderHook(() => usePagination({ totalPages: 10 }));
    act(() => {
      result.current.goToPage(1);
      result.current.handlePreviousPage();
    });
    expect(result.current.currentPage).toBe(1);
  });

  test("should not go beyond the last page", () => {
    const { result } = renderHook(() => usePagination({ totalPages: 10 }));
    act(() => {
      result.current.goToPage(10);
      result.current.handleNextPage();
    });
    expect(result.current.currentPage).toBe(10);
  });
});

// useFavorites
describe("useFavorites hook", () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value.toString();
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      }),
    };
  })();

  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });

  const pokemon = {
    id: 1,
    name: "Pikachu",
    height: 40,
    weight: 60,
    sprites: { front_default: "sprite-url" },
    stats: [],
    types: [],
  };

  test("should initialize isFavorite to false", () => {
    const { result } = renderHook(() => useFavorites(pokemon));
    expect(result.current.isFavorite).toBe(false);
  });

  test("should toggle isFavorite", () => {
    const { result } = renderHook(() => useFavorites(pokemon));
    act(() => {
      result.current.toggleFavorite();
    });
    expect(result.current.isFavorite).toBe(true);
  });

  test("should store pokemon id in localStorage when toggling favorite", () => {
    const { result } = renderHook(() => useFavorites(pokemon));
    act(() => {
      result.current.toggleFavorite();
    });
    expect(localStorageMock.setItem).toHaveBeenCalledWith("favorites", "[1]");
  });

  test("should remove pokemon id from localStorage when toggling favorite again", () => {
    const { result } = renderHook(() => useFavorites(pokemon));
    // Toggle favorite once
    act(() => {
      result.current.toggleFavorite();
    });
    // Toggle favorite again
    act(() => {
      result.current.toggleFavorite();
    });
    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      "favorites",
      "[]"
    );
  });

  test("should toggle favorite status for multiple Pokemon", () => {
    const pokemon1 = {
      id: 1,
      name: "Pikachu",
      height: 40,
      weight: 60,
      sprites: { front_default: "sprite-url" },
      stats: [],
      types: [],
    };
    const pokemon2 = {
      id: 2,
      name: "Charmander",
      height: 40,
      weight: 60,
      sprites: { front_default: "sprite-url" },
      stats: [],
      types: [],
    };

    const { result: result1 } = renderHook(() => useFavorites(pokemon1));
    const { result: result2 } = renderHook(() => useFavorites(pokemon2));

    // Toggle favorite for Pokemon 1
    act(() => {
      result1.current.toggleFavorite();
    });

    expect(result1.current.isFavorite).toBe(true);
    expect(result2.current.isFavorite).toBe(false);

    // Toggle favorite for Pokemon 2
    act(() => {
      result2.current.toggleFavorite();
    });

    expect(result1.current.isFavorite).toBe(true);
    expect(result2.current.isFavorite).toBe(true);

    // Toggle favorite again for Pokemon 1
    act(() => {
      result1.current.toggleFavorite();
    });

    expect(result1.current.isFavorite).toBe(false);
    expect(result2.current.isFavorite).toBe(true);
  });
});

describe("useLogin hook", () => {
  test("should update email state", () => {
    const { result } = renderHook(() => useLogin(jest.fn()));

    act(() => {
      result.current.setEmail("test@example.com");
    });

    expect(result.current.email).toBe("test@example.com");
  });

  test("should update password state", () => {
    const { result } = renderHook(() => useLogin(jest.fn()));

    act(() => {
      result.current.setPassword("testPassword123");
    });

    expect(result.current.password).toBe("testPassword123");
  });

  test("should clear error message", () => {
    const { result } = renderHook(() => useLogin(jest.fn()));

    act(() => {
      result.current.setEmail("invalidEmail");
      result.current.clearErrorMessage();
    });

    expect(result.current.errorMessage).toBe("");
  });

  test("should set error message for invalid email", () => {
    const { result } = renderHook(() => useLogin(jest.fn()));

    act(() => {
      result.current.setEmail("invalidEmail");
      result.current.handleLogin();
    });

    expect(result.current.errorMessage).toBe(
      "Please enter a valid email address."
    );
  });

  test("should set error message for invalid password", () => {
    const { result } = renderHook(() => useLogin(jest.fn()));

    act(() => {
      result.current.setEmail("test@example.com");
      result.current.handleLogin();
    });

    act(() => {
      result.current.setPassword("weak");
      result.current.handleLogin();
    });

    expect(result.current.errorMessage).toBe(
      "Password must contain at least one uppercase letter, one number, one special character, and have a minimum length of 6 characters."
    );
  });
});
