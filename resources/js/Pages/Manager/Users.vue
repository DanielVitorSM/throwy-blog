<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, router, Link } from "@inertiajs/vue3";
import { ref, type PropType } from "vue";
import { QTable } from "quasar";
import dayjs from "dayjs";
import { formatDatetime } from "@/Utils/functions";

const { roles, active, pagination } = defineProps({
	users: {
		type: Array as PropType<User[]>,
		required: true
	},
	pagination: {
		type: Object as PropType<QTable["pagination"]>,
		required: true
	},
	active: {
		type: Boolean,
		default: () => true
	},
	roles: {
		type: Object,
		required: true
	}
});

const columns: QTable["columns"] = [
	{
		name: "name",
		field: "name",
		label: "Nome",
		align: "left",
		sortable: true
	},
	{
		name: "role",
		field: (val: User) => roles[val.role],
		label: "Tipo",
		align: "left"
	},
	{
		name: "email",
		field: 'email',
		label: "Email",
		align: "left"
	},
	{
		name: "last_login_at",
		field: "last_login_at",
		format: (val: string) => val ? dayjs(val).fromNow() : '-',
		label: "Último login",
		align: "center",
	},
	{
		name: "created_at",
		field: "created_at",
		format: formatDatetime,
		label: "Criado em",
		align: "center",
		sortable: true
	},
	{
		name: "actions",
		field: (val: User) => val,
		label: "Ações",
		align: "center"
	}
];

const loading = ref(false);

const onRequest = (props: any) => {
	const { page, rowsPerPage, sortBy, descending } = props.pagination;

	loading.value = true;
	router.reload({
		only: ["users", "pagination"],
		preserveState: true,
		data: {
			page,
			rowsPerPage,
			sortBy,
			descending,
			active
		},
		onFinish: () => (loading.value = false)
	});
};
</script>

<template>
	<Head title="Todos os Usuários" />

	<AuthenticatedLayout>
		<section class="q-mb-lg q-col-gutter-lg row items-center">
			<h2 class="text-bold text-h4 q-ma-none">Todos os Usuários</h2>
			<q-space v-if="$q.screen.gt.xs" />

			<q-btn-group unelevated flat>
				<q-btn
					color="secondary"
					:outline="!active"
					:disable="loading || active"
					label="Ativos"
					unelevated
					no-caps
					@click="() => router.reload({ data: { active: true } })"
				/>
				<q-btn
					color="secondary"
					:outline="active"
					:disable="loading || !active"
					label="Arquivados"
					unelevated
					no-caps
					@click="() => router.reload({ data: { active: false } })"
				/>
			</q-btn-group>

			<Link class="text-reset" :href="$route('users.create')">
				<q-btn color="primary" :disable="loading" label="Novo" unelevated no-caps />
			</Link>
		</section>

		<section>
			<q-table
				flat
				class="full-width sticky-last-column"
				bordered
				:key="(+new Date()).toString(36)"
				@request="onRequest"
				:rows-per-page-options="[5, 10, 25, 50]"
				:loading="loading"
				binary-state-sort
				:rows="users"
				:pagination="pagination"
				:columns="columns"
				row-key="id"
			>
				<template v-slot:body-cell-actions="props">
					<q-td :props="props">
						<q-btn icon="more_horiz" flat round>
							<q-menu>
								<q-list dense style="min-width: 100px">
									<Link class="text-reset" :href="$route('users.edit', { id: props.value.id })">
										<q-item dense clickable v-close-popup>
											<q-item-section>Editar</q-item-section>
										</q-item>
									</Link>

									<q-item
										v-if="props.value.deleted_at"
										@click="
											router.post(
												$route('users.restore', { id: props.value.id }),
												{ headers: { 'X-Reload': 'true' } }
											)
										"
										dense
										clickable
										v-close-popup
									>
										<q-item-section>Restaurar</q-item-section>
									</q-item>
									<q-separator />

									<q-item
										@click="
											router.delete(
												$route('users.destroy', { id: props.value.id }),
												{ headers: { 'X-Reload': 'true' } }
											)
										"
										dense
										clickable
										class="text-red-8"
										v-close-popup
									>
										<q-item-section>
											{{
												props.value.deleted_at
													? "Remover permanentemente"
													: "Remover"
											}}
										</q-item-section>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
					</q-td>
				</template>
			</q-table>
		</section>
	</AuthenticatedLayout>
</template>
