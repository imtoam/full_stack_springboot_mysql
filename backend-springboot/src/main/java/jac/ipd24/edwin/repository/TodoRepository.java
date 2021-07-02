package jac.ipd24.edwin.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import jac.ipd24.edwin.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByIsdone(boolean isdone);
}
