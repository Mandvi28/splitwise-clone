from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Expense
from .serializers import ExpenseSerializer


# CREATE EXPENSE
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Expense, ExpenseSplit, GroupMember
from .serializers import ExpenseSerializer


@api_view(["POST"])
def create_expense(request):
    serializer = ExpenseSerializer(data=request.data)

    if serializer.is_valid():
        expense = serializer.save()

        # 🔥 GET GROUP MEMBERS
        members = GroupMember.objects.filter(group=expense.group)

        # 🔥 SAFETY CHECK
        if members.count() == 0:
            return Response(
                {"error": "No members in group"},
                status=400
            )

        # 🔥 SPLIT LOGIC
        if expense.split_type == "equal":
            split_amount = expense.amount / members.count()

            for member in members:
                ExpenseSplit.objects.create(
                    expense=expense,
                    user=member.user,
                    amount_owed=split_amount
                )

        return Response(ExpenseSerializer(expense).data, status=201)

    return Response(serializer.errors, status=400)

# GET EXPENSES (FILTER BY GROUP)
@api_view(["GET"])
def get_expenses(request):
    group_id = request.GET.get("group_id")

    if group_id:
        expenses = Expense.objects.filter(group_id=group_id)
    else:
        expenses = Expense.objects.all()

    serializer = ExpenseSerializer(expenses, many=True)
    return Response(serializer.data)


# UPDATE EXPENSE
@api_view(["PUT"])
def update_expense(request, pk):
    try:
        expense = Expense.objects.get(id=pk)
    except Expense.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    serializer = ExpenseSerializer(expense, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)


# DELETE EXPENSE
@api_view(["DELETE"])
def delete_expense(request, pk):
    try:
        expense = Expense.objects.get(id=pk)
        expense.delete()
        return Response({"message": "Deleted"})
    except Expense.DoesNotExist:
        return Response({"error": "Not found"}, status=404)