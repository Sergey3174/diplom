import styled from 'styled-components';
import { Card } from './components';
import { useRequestData } from '../../hooks';
import { ContentContainer, ItemCard } from './components/card/components';
import { useSelector } from 'react-redux';
import { selectAccounts, selectCategories, selectUserId } from '../../selectors';
import { calculateBalance, filterType } from '../../utils';

const MainPageContainer = ({ className }) => {
	const userId = useSelector(selectUserId);
	const { accounts } = useSelector(selectAccounts);
	const { categories } = useSelector(selectCategories);

	const { lastIncomeTransactions, lastExpenseTransactions } = useRequestData(userId);

	const incomeCategories = filterType(categories, 'income');
	const expenseCategories = filterType(categories, 'expense');

	const balance = calculateBalance(accounts);

	return (
		<div className={className}>
			<Card name="Общая статистика" flex="1 1 100%;">
				<ContentContainer>
					<ItemCard
						name="Общий баланс"
						amount={balance}
						type={balance >= 0 ? 'income' : 'expense'}
					/>
				</ContentContainer>
				<ContentContainer>
					<ItemCard
						name="Доходы"
						type="income"
						amount={calculateBalance(incomeCategories)}
					/>
				</ContentContainer>
				<ContentContainer>
					<ItemCard
						name="Расходы"
						type="expense"
						amount={calculateBalance(expenseCategories)}
					/>
				</ContentContainer>
			</Card>
			<Card to="/transaction" name="Доходы">
				<ContentContainer>
					{lastIncomeTransactions.length &&
						lastIncomeTransactions.map(
							({ id, description, transactionDate, amount, type }) => (
								<ItemCard
									to="/transaction"
									date={transactionDate}
									name={description}
									id={id}
									amount={amount}
									key={id}
									type={type}
								/>
							),
						)}
				</ContentContainer>
			</Card>
			<Card to="/transaction" name="Расходы">
				<ContentContainer>
					{lastExpenseTransactions.length &&
						lastExpenseTransactions.map(
							({ id, description, transactionDate, amount, type }) => (
								<ItemCard
									to="/transaction"
									date={transactionDate}
									name={description}
									id={id}
									amount={amount}
									key={id}
									type={type}
								/>
							),
						)}
				</ContentContainer>
			</Card>

			<Card to="/category" name="Категории">
				<ContentContainer name="Доходы">
					{incomeCategories.length &&
						incomeCategories.map(({ id, name, amount, type }) => (
							<ItemCard
								to="/category"
								name={name}
								id={id}
								amount={amount}
								key={id}
								type={type}
							/>
						))}
				</ContentContainer>
				<ContentContainer name="Расходы">
					{expenseCategories.length &&
						expenseCategories.map(({ id, name, amount, type }) => (
							<ItemCard
								to="/category"
								name={name}
								id={id}
								amount={amount}
								key={id}
								type={type}
							/>
						))}
				</ContentContainer>
			</Card>

			<Card to="/account" name="Счета">
				<ContentContainer>
					{accounts.length &&
						accounts.map(({ id, name, amount }) => (
							<ItemCard
								to="/account"
								name={name}
								id={id}
								amount={amount}
								key={id}
								type={amount >= 0 ? 'income' : 'expense'}
							/>
						))}
				</ContentContainer>
			</Card>
		</div>
	);
};

export const MainPage = styled(MainPageContainer)`
	margin-top: 15px;
	display: flex;
	gap: 15px;
	flex-wrap: wrap;
	justify-content: center;
`;
