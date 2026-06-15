from django.urls import path
from . import views

urlpatterns = [
    # =========================
    # EXPENSE APIs (STEP 13 ONLY)
    # =========================

    path('expenses/', views.create_expense),  # POST
    path('expenses/list/', views.get_expenses),  # GET
    path('expenses/<int:expense_id>/', views.update_expense),  # PUT
    path('expenses/<int:expense_id>/delete/', views.delete_expense),  # DELETE
]