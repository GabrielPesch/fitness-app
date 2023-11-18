CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    image VARCHAR(255), 
    muscular_group VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
    
 CONSTRAINT chk_muscular_group
    CHECK (muscular_group IN ('BICEPS', 'TRICEPS', 'PEITO', 'COSTAS', 'LOMBAR', 'ABDÓMEN', 'PERNAS'))
);


CREATE TRIGGER update_exercise_modtime
BEFORE UPDATE ON exercises
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
