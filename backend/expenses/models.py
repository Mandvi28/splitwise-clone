from django.db import models
from django.contrib.auth.models import User


class Group(models.Model):
    name = models.CharField(max_length=255)
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_groups'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class GroupMember(models.Model):
    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        related_name='members'
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.user.username} - {self.group.name}"


class Expense(models.Model):
    SPLIT_CHOICES = (
        ('equal', 'Equal'),
        ('exact', 'Exact'),
    )

    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        related_name='expenses'
    )

    paid_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    description = models.CharField(max_length=255)

    split_type = models.CharField(
        max_length=20,
        choices=SPLIT_CHOICES,
        default='equal'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description


class ExpenseSplit(models.Model):
    expense = models.ForeignKey(
        Expense,
        on_delete=models.CASCADE,
        related_name='splits'
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    amount_owed = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return f"{self.user.username} owes {self.amount_owed}"


class Settlement(models.Model):
    payer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='payments_made'
    )

    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='payments_received'
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.payer.username} paid {self.receiver.username}"


class ExpenseComment(models.Model):
    expense = models.ForeignKey(
        Expense,
        on_delete=models.CASCADE,
        related_name='comments'
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message[:30]