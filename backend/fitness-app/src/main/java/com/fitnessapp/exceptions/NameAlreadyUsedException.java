package com.fitnessapp.exceptions;

public class NameAlreadyUsedException extends RuntimeException {
	private static final long serialVersionUID = 1L;
			
    public NameAlreadyUsedException(String message) {
        super(message);
    }
}
