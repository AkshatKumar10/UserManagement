import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getLoggedUser } from "../../features/usersManagementSlice";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Paper,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { motion, AnimatePresence } from "framer-motion";

const TodoList = () => {
  const loggedUser = useSelector(getLoggedUser);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (loggedUser?.user?._id) {
      fetchTodos();
    }
  }, [loggedUser]);

  const fetchTodos = async () => {
    if (!loggedUser?.user?._id) return;
    try {
      const response = await axios.get(`/api/todos/user/${loggedUser.user._id}`);
      setTodos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim() || !loggedUser?.user?._id) return;
    try {
      await axios.post(`/api/todos/user/${loggedUser.user._id}`, {
        text: newTodo,
      });
      setNewTodo("");
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (todo) => {
    try {
      await axios.put(`/api/todos/${todo._id}`, {
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{
          backgroundColor: "background.default",
          minHeight: "80vh",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h3" align="center" sx={{ color: "primary.main", mb: 1, fontWeight: 800, letterSpacing: "-0.04em" }}>
          Workspace
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: "text.secondary", mb: 4 }}>
          Focus on your tasks for today.
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            display: "flex",
            alignItems: "center",
            mb: 4,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "rgba(0,161,155,0.2)",
            backgroundColor: "white",
            boxShadow: "0 10px 30px rgba(0,161,155,0.05)",
          }}
        >
          <TextField
            fullWidth
            placeholder="Add a new task..."
            variant="standard"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            InputProps={{ 
              disableUnderline: true,
              sx: { px: 2, py: 1, fontSize: "1.1rem" }
            }}
          />
          <IconButton 
            onClick={addTodo}
            sx={{ 
              backgroundColor: "primary.main", 
              color: "white",
              "&:hover": { backgroundColor: "#008a84" },
              borderRadius: 3
            }}
          >
            <AddIcon />
          </IconButton>
        </Paper>

        <List sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <AnimatePresence>
            {todos.map((todo, index) => (
              <ListItem
                key={todo._id}
                component={motion.li}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                layout
                sx={{
                  backgroundColor: "white",
                  borderRadius: 3,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.02)",
                  "&:hover": { boxShadow: "0 8px 25px rgba(0,0,0,0.06)" },
                }}
                secondaryAction={
                  <IconButton edge="end" onClick={() => deleteTodo(todo._id)}>
                    <DeleteIcon sx={{ color: "rgba(0,0,0,0.2)", "&:hover": { color: "#ff4444" } }} />
                  </IconButton>
                }
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                  sx={{ 
                    color: "primary.main", 
                    "&.Mui-checked": { color: "primary.main" },
                    mr: 1
                  }}
                />
                <ListItemText
                  primary={todo.text}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: 600,
                      fontSize: "1rem",
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "text.secondary" : "text.primary",
                      opacity: todo.completed ? 0.6 : 1,
                      transition: "all 0.3s ease"
                    }
                  }}
                />
              </ListItem>
            ))}
          </AnimatePresence>
        </List>
      </Box>
    </Container>
  );
};

export default TodoList;
