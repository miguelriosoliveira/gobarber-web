import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const onSubmit = useCallback(async (data: object) => {
		try {
			formRef.current?.setErrors({});

			const schema = Yup.object().shape({
				email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
				password: Yup.string().required('Senha obrigatória'),
			});

			await schema.validate(data, { abortEarly: false });
		} catch (err) {
			console.log(err);
			formRef.current?.setErrors(getValidationErrors(err));
		}
	}, []);

	return (
		<Container>
			<Content>
				<img src={logo} alt="GoBarber logo" />

				<Form ref={formRef} onSubmit={onSubmit}>
					<h1>Faça seu logon</h1>

					<Input name="email" icon={FiMail} placeholder="E-mail" />
					<Input name="password" icon={FiLock} type="password" placeholder="Senha" />

					<Button type="submit">Entrar</Button>

					<Link to="/forgot">Esqueci minha senha</Link>
				</Form>

				<Link to="/signup">
					<FiLogIn />
					Criar conta
				</Link>
			</Content>

			<Background />
		</Container>
	);
};

export default SignIn;
