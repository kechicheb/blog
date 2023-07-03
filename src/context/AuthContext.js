'use client';
import { createContext, useReducer, useEffect } from 'react';

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.payload };
		case 'LOGOUT':
			return { ...state, user: null };
		default:
			return state;
	}
};

export const AuthContext = createContext({ state: null, dispatch: () => null });

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
	});

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		console.log('useContext');
		console.log(user);
		if (user) {
			dispatch({ type: 'LOGIN', payload: user });
		}
	}, []);

	return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};
