import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const WritePostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('공지');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      category,
      content,
      author: 'user', 
      date: new Date().toISOString().split('T')[0],
      views: 0,
    };
    console.log('New Post:', newPost);
    navigate('/board');
  };

  return (
    <Container>
      <h2>글쓰기</h2>
      <Form onSubmit={handleSubmit}>
        <Label>
          제목:
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Label>
        <Label>
          카테고리:
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="공지">공지</option>
            <option value="질문">질문</option>
            <option value="기타">기타</option>
          </Select>
        </Label>
        <Label>
          내용:
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Label>
        <Button type="submit">저장</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 14px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  font-size: 14px;
  height: 150px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #004d40;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #00332a;
  }
`;

export default WritePostPage;
