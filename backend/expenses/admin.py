from django.contrib import admin
from .models import (
    Group,
    GroupMember,
    Expense,
    ExpenseSplit,
    Settlement,
    ExpenseComment
)

admin.site.register(Group)
admin.site.register(GroupMember)
admin.site.register(Expense)
admin.site.register(ExpenseSplit)
admin.site.register(Settlement)
admin.site.register(ExpenseComment)