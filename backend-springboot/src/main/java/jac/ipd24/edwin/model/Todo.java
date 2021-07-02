package jac.ipd24.edwin.model;
import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "task")
    private String task;

    @Column(name = "due")
    private Date due;

    @Column(name = "isdone")
    private boolean isdone;

    public Todo(){}

    public Todo(String task, Date due, boolean isdone){
        this.task = task;
        this.due = due;
        this.isdone = isdone;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public Date getDue() {
        return due;
    }

    public void setDue(Date due) {
        this.due = due;
    }

    public boolean isIsdone() {
        return isdone;
    }

    public void setIsdone(boolean isdone) {
        this.isdone = isdone;
    }

    @Override
    public String toString(){
        String todoStr = String.format("Todo [id=%d, task=%s, due=%s, isdone=%b]", id, task, due, isdone );
        return todoStr;
    }
}
